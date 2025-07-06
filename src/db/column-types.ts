import { customType } from 'drizzle-orm/pg-core';

export const linestring = customType<{
  data: Array<[x: number, y: number]>;
  driverData: string;
}>({
  dataType() {
    return 'geometry(Linestring, 4326)';
  },
  /**
   * Convert to GeoJSON to let postgis do the actual conversion
   */
  toDriver(v) {
    return JSON.stringify({ type: 'LineString', coordinates: v });
  },

  fromDriver(v) {
    return v;
  },
});
