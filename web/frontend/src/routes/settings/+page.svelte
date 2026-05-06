<script lang="ts">
  import { onMount } from 'svelte';
  import { get } from 'svelte/store';
  import { goto } from '$app/navigation';
  import PageCard from '$lib/components/PageCard.svelte';
  import { devicesRequest, meRequest, revokeDeviceRequest, type AuthUser, type DeviceItem } from '$lib/api/client';
  import { authStore } from '$lib/stores/auth';

  let loading = true;
  let errorMessage = '';
  let actionMessage = '';
  let user: AuthUser | null = null;
  let devices: DeviceItem[] = [];
  let revokingId: number | null = null;

  onMount(async () => {
    const snapshot = get(authStore);
    if (!snapshot.token) {
      await goto('/login');
      return;
    }

    loading = true;
    errorMessage = '';

    try {
      const [me, deviceData] = await Promise.all([meRequest(snapshot.token), devicesRequest(snapshot.token)]);
      user = me.user;
      authStore.setUser(me.user);
      devices = deviceData.devices;
    } catch (error) {
      errorMessage = error instanceof Error ? error.message : 'Unable to load settings.';
      if (errorMessage.toLowerCase().includes('unauth')) {
        authStore.clear();
        await goto('/login');
      }
    } finally {
      loading = false;
    }
  });

  async function revokeDevice(deviceId: number): Promise<void> {
    const snapshot = get(authStore);
    if (!snapshot.token) {
      await goto('/login');
      return;
    }

    revokingId = deviceId;
    actionMessage = '';
    errorMessage = '';

    try {
      await revokeDeviceRequest(snapshot.token, deviceId);
      devices = devices.map((item) => (item.id === deviceId ? { ...item, revoked_at: new Date().toISOString() } : item));
      actionMessage = 'Device revoked.';
    } catch (error) {
      errorMessage = error instanceof Error ? error.message : 'Unable to revoke device.';
    } finally {
      revokingId = null;
    }
  }
</script>

<PageCard title="Account settings" description="Manage profile, sessions, and security-sensitive provider preferences.">
  {#if loading}
    <p>Loading settings...</p>
  {:else}
    {#if errorMessage}<p class="error">{errorMessage}</p>{/if}
    {#if actionMessage}<p class="ok">{actionMessage}</p>{/if}

    <section class="panel">
      <h2>Profile</h2>
      <p class="meta">Name: {user?.name ?? 'N/A'}</p>
      <p class="meta">Email: {user?.email ?? 'N/A'}</p>
    </section>

    <section class="panel">
      <h2>Devices & sessions</h2>
      {#if devices.length === 0}
        <p class="meta">No devices registered yet.</p>
      {:else}
        <div class="list">
          {#each devices as device}
            <article class="row">
              <div>
                <p class="title">{device.name} ({device.platform})</p>
                <p class="meta">Distro: {device.distro_name ?? 'N/A'} | App: {device.app_version ?? 'N/A'}</p>
              </div>
              <button
                class="button secondary"
                type="button"
                disabled={revokingId === device.id || !!device.revoked_at}
                on:click={() => revokeDevice(device.id)}
              >
                {device.revoked_at ? 'Revoked' : revokingId === device.id ? 'Revoking...' : 'Revoke'}
              </button>
            </article>
          {/each}
        </div>
      {/if}
    </section>
  {/if}
</PageCard>

<style>
  .panel{border:1px solid var(--border);border-radius:12px;padding:12px;margin-top:12px}
  h2{margin:0 0 8px;font-size:1rem}
  .meta{margin:4px 0;color:var(--muted)}
  .title{margin:0;color:var(--text)}
  .error{margin:0;color:var(--danger)}
  .ok{margin:0;color:var(--terminal)}
  .list{display:grid;gap:10px}
  .row{display:flex;justify-content:space-between;gap:10px;align-items:center;border:1px solid var(--border);border-radius:10px;padding:10px}
  button:disabled{opacity:.75;cursor:not-allowed}
</style>
