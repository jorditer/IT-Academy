export interface Notes {
	_id: string;
	Subject: string;
	Location?: string;
	StartTime: Date;
	EndTime: Date;
	IsAllDay: boolean;
	RecurrenceRule?: string;
	StartTimezone?: string;
	EndTimezone?: string;
	Description?: string;
	RecurrenceID?: string;
	RecurrenceException?: string;
  }
  export interface ApiResponse {
	success: boolean;
	data: Notes[];
  }
