"use client";

import {
  ScheduleComponent,
  ViewsDirective,
  ViewDirective,
  Inject,
  Day,
  Week,
  Month,
  PopupOpenEventArgs,
} from "@syncfusion/ej2-react-schedule";
import { registerLicense } from "@syncfusion/ej2-base";
import { useNotes } from "../hooks/useNotes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNoteMutations } from "../hooks/useNoteMutations";
import { useRef } from "react";

registerLicense("Ngo9BigBOggjHTQxAR8/V1NDaF1cWGhIfEx1RHxQdld5ZFRHallYTnNWUj0eQnxTdEBjWH1XcXNXQGVVVE1wXQ==");

import "../../../node_modules/@syncfusion/ej2-base/styles/material.css";
import "../../../node_modules/@syncfusion/ej2-buttons/styles/material.css";
import "../../../node_modules/@syncfusion/ej2-calendars/styles/material.css";
import "../../../node_modules/@syncfusion/ej2-dropdowns/styles/material.css";
import "../../../node_modules/@syncfusion/ej2-inputs/styles/material.css";
import "../../../node_modules/@syncfusion/ej2-lists/styles/material.css";
import "../../../node_modules/@syncfusion/ej2-navigations/styles/material.css";
import "../../../node_modules/@syncfusion/ej2-popups/styles/material.css";
import "../../../node_modules/@syncfusion/ej2-splitbuttons/styles/material.css";
import "../../../node_modules/@syncfusion/ej2-react-schedule/styles/material.css";

interface Note {
  _id?: string;
  Subject: string;
  StartTime: Date;
  EndTime: Date;
  IsAllDay: boolean;
  RecurrenceRule: string;
  StartTimezone: string;
  EndTimezone: string;
  Description: string;
  Location: string;
  RecurrenceId: string;
  RecurrenceException: string;
}

const Calendar = () => {
  const { data: notes, isLoading, error } = useNotes();
  const { deleteNote, updateNote } = useNoteMutations();
  const queryClient = useQueryClient();
  
  // I deleted the ability to create recurring notes as it was not working properly with my current setup, spent two days with chatGPT and documentation but it was buggy & not worth it to keep it in the final version :(
    const scheduleObj = useRef<ScheduleComponent | null>(null);
    const onPopupOpen = (args: PopupOpenEventArgs): void => {
      if (args.type === 'Editor' && args.element.querySelector('.e-recurrenceeditor')) {
        const recurrenceEditor = (scheduleObj.current as any).eventWindow.recurrenceEditor;
        recurrenceEditor.frequencies = ['none'];
      }
    };
  const createNote = useMutation({
    mutationFn: async (newNote: Note) => {
      const response = await fetch("/api/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newNote),
      });
      if (!response.ok) throw new Error("Failed to create note");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  const transformedNotes = notes?.map((note) => ({
    ...note,
    Id: note._id, // Syncfusion expects 'Id' not '_id'
  }));
  const onActionComplete = async (args: any) => {

    console.log(args);
    if (args.requestType === "eventCreated") {
      try {
        const newNote = {
          Subject: args.data[0].Subject,
          StartTime: args.data[0].StartTime,
          EndTime: args.data[0].EndTime,
          IsAllDay: args.data[0].IsAllDay,
          RecurrenceRule: args.data[0].RecurrenceRule,
          StartTimezone: args.data[0].StartTimezone,
          EndTimezone: args.data[0].EndTimezone,
          Description: args.data[0].Description,
          Location: args.data[0].Location,
          RecurrenceId: args.data[0].RecurrenceId,
          RecurrenceException: args.data[0].RecurrenceException,
        };
        await createNote.mutateAsync(newNote);
      } catch (error) {
        console.error("Failed to create note:", error);
      }
    } else if (args.requestType === "eventRemoved") {
      try {
        const isRecurring = args.data[0].RecurrenceRule;
        const isOccurrence = args.data[0].RecurrenceID;
        
        if (isRecurring && isOccurrence) {
          console.log("Deleting single occurrence, should update RecurrenceException");
          return;
        }

        await deleteNote.mutateAsync(args.data[0]._id);
      } catch (error) {
        console.error("Failed to delete note:", error);
      }
    } else if (args.requestType === "eventChanged") {
      try {
        const updates = {
          Subject: args.data[0].Subject,
          StartTime: args.data[0].StartTime,
          EndTime: args.data[0].EndTime,
          IsAllDay: args.data[0].IsAllDay,
          Description: args.data[0].Description,
          Location: args.data[0].Location,
          RecurrenceRule: args.data[0].RecurrenceRule,
          StartTimezone: args.data[0].StartTimezone,
          EndTimezone: args.data[0].EndTimezone,
        };
    
        await updateNote.mutateAsync({
          id: args.data[0].Id,
          updates: updates
        });
      } catch (error) {
        console.error("Failed to update note:", error);
      }
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading calendar data</div>;
  if (!notes) return <div>No events found</div>;

  return (
    <>
      <h1>Calendar</h1>
      <div className="max-h-min">
        <ScheduleComponent
        ref={scheduleObj}
          height={850}
          eventSettings={{
            dataSource: transformedNotes,
          }}
          popupOpen={onPopupOpen.bind(this)}
          actionComplete={onActionComplete}
          selectedDate={new Date(2025, 1, 11)}
        >
          <ViewsDirective>
            <ViewDirective option="Day" />
            <ViewDirective option="Week" />
            <ViewDirective option="Month" />
          </ViewsDirective>
          <Inject services={[Day, Week, Month]} />
        </ScheduleComponent>
      </div>
    </>
  );
};

export default Calendar;
