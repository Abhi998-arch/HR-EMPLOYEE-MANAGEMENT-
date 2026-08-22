import { createClient } from './supabase';
import type { RealtimeChannel } from '@supabase/supabase-js';

export function subscribeToTable(
  table: string,
  filter: string | undefined,
  callback: (payload: any) => void
): RealtimeChannel {
  const supabase = createClient();
  const channel = supabase
    .channel(`${table}-changes`)
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table,
        ...(filter ? { filter } : {}),
      },
      callback
    )
    .subscribe();
  return channel;
}

export function unsubscribe(channel: RealtimeChannel) {
  const supabase = createClient();
  supabase.removeChannel(channel);
}
