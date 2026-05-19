import { createClient } from '@base44/sdk';
import { appParams } from '@/lib/app-params';

const { appId, token, functionsVersion, appBaseUrl } = appParams;

//Create a client with authentication required
export const base44 = createClient({
  appId,
  token,
  functionsVersion,
  // Use Base44 origin directly in production instead of same-origin /api routes on GitHub Pages.
  serverUrl: appBaseUrl || '',
  requiresAuth: false,
  appBaseUrl
});
