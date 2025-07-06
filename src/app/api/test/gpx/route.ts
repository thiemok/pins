import { getGpxData } from '@/lib/actions/gpx/gpx';

export async function GET() {
  const data = await getGpxData();

  return Response.json(data);
}
