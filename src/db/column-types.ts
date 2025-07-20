import { customType } from 'drizzle-orm/pg-core';
import { LineString, parse, Point as WkpPoint } from 'well-known-parser';

type Point = readonly [x: number, y: number];
type PointZ = readonly [x: number, y: number, ele: number | undefined];
type PointZM = readonly [
  x: number,
  y: number,
  ele: number | undefined,
  ts: number | undefined,
];

export const linestring = customType<{
  data: Array<Point>;
  driverData: string;
}>({
  dataType() {
    return 'geometry(Linestring, 4326)';
  },

  toDriver(v) {
    const points = v.map(([x, y]) => new WkpPoint(x, y));
    const ls = new LineString(points);
    return ls.toWkb().toString('hex');
  },

  fromDriver(v): Array<Point> {
    const parsed = parse(Buffer.from(v, 'hex'));
    if (parsed instanceof LineString) {
      return parsed.points.map((point) => [point.x, point.y] as const);
    }
    throw new Error('Received invalid result, expected LineString');
  },
});

export const linestringZ = customType<{
  data: Array<PointZ>;
  driverData: string;
  notNull: true;
}>({
  dataType() {
    return 'geometry(LinestringZ, 4326)';
  },

  toDriver(v) {
    const points = v.map(([x, y, ele]) => WkpPoint.Z(x, y, ele ?? 0));
    const ls = new LineString(points);
    return ls.toWkb().toString('hex');
  },

  fromDriver(v): Array<PointZ> {
    const parsed = parse(Buffer.from(v, 'hex'));
    if (parsed instanceof LineString) {
      return parsed.points.map((point) => [point.x, point.y, point.z] as const);
    }
    throw new Error('Received invalid result, expected LineString');
  },
});

export const linestringZM = customType<{
  data: Array<PointZM>;
  driverData: string;
  notNull: true;
}>({
  dataType() {
    return 'geometry(LinestringZM, 4326)';
  },

  toDriver(v) {
    const points = v.map(([x, y, ele, ts]) =>
      WkpPoint.ZM(x, y, ele ?? 0, ts ?? 0)
    );
    const ls = new LineString(points);
    return ls.toWkb().toString('hex');
  },

  fromDriver(v): Array<PointZM> {
    const parsed = parse(Buffer.from(v, 'hex'));
    if (parsed instanceof LineString) {
      return parsed.points.map(
        (point) =>
          [point.x, point.y, point.z, point.m ? point.m : undefined] as const
      );
    }
    throw new Error('Received invalid result, expected LineString');
  },
});
