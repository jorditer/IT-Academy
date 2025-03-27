import { Feature, Point } from 'geojson';

export interface APIResponse {
	data: CoordinateFeature[]
  }
  
  export interface CoordinateFeature extends Feature<Point> {
	properties: {
	  title: string
	  description: string
	  "marker-size": string
	  "marker-color": string
	  "marker-symbol": string
	}
  }
  