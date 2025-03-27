import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { ConcertEvent } from "../types/ConcertEvent";
import { useEventMutations } from "../hooks/useEventMutations";
import { useState, useCallback, useMemo } from "react";
import { GridReadyEvent, CellValueChangedEvent } from "ag-grid-community";
import Form from "./Form";
import { CrudProps } from "../types/CrudProps";

interface DateTimeEditorProps {
  value: string;
  node: {
    setDataValue: (colId: string, value: string) => void;
  };
  column: {
    colId: string;
  };
  stopEditing: () => void;
}

const Crud = ({ events }: CrudProps) => {
  const { updateEvent, deleteEvent, createEvent } = useEventMutations();
  const [showForm, setShowForm] = useState(false);
  const [newEvent, setNewEvent] = useState<Omit<ConcertEvent, "_id">>({
    name: "",
    location: "",
    price: 0,
    date: new Date().toISOString(),
    description: "",
  });

  const handleShowForm = () => {
    setShowForm(prev => !prev);
  }

  const DateTimeEditor = (props: DateTimeEditorProps) => {
    // Initialize with current value
    const initialValue = props.value;
    const [value, setValue] = useState(initialValue);
    
    const formatDateForInput = (isoString: string) => {
      const date = new Date(isoString);
      return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}T${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes().toString().padStart(2, '0'))}`;
    };

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newDate = new Date(e.target.value);
      const isoString = newDate.toISOString();
      setValue(isoString);
      
      // Update the cell value
      props.node.setDataValue(props.column.colId, isoString);
      props.stopEditing();
    };
  
    return (
      <input
        type="datetime-local"
        value={formatDateForInput(value)}
        onChange={onChange}
        className="w-full h-full"
        step="60"
      />
    );
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteEvent.mutateAsync(id);
    } catch (error) {
      console.error("Failed to delete:", error);
    }
  };

  const handleCreate = async () => {
    try {
      await createEvent.mutateAsync(newEvent);
      setShowForm(false);
      setNewEvent({ name: "", location: "", price: 0, date: new Date().toISOString(), description: "" });
    } catch (error) {
      console.error("Failed to create:", error);
    }
  };

  const myCellComponent = ({ value }: { value: string }) => {
    return (
      <>
        <button
          style={{ alignContent: "center" }}
          onClick={() => handleDelete(value)}
          className="shadow -ms-1 rounded-full border-2 hover:bg-red-400 bg-red-200 active:bg-red-500 border-red-700 hover:border-red-900 w-5 h-5 inline-flex items-center justify-center me-2"
        >
          -
        </button>
        {value}
      </>
    );
  };

  const defaultColDef = useMemo(
    () => ({
      resizable: true,
      sortable: true,
      suppressSizeToFit: false,
      flex: 1,
    }),
    []
  );

  const onCellValueChanged = async (params: CellValueChangedEvent) => {
    try {
      await updateEvent.mutateAsync({
        id: params.data._id,
        updates: { [params.colDef.field!]: params.newValue },
      });
    } catch (error) {
      console.error("Failed to update:", error);
      params.api.refreshCells();
    }
  };

  // AG Grid makes you define the fields with the name of the key of the json value they will represent
  const [colDefs] = useState([
    { cellRenderer: myCellComponent, field: "_id" },
    { field: "name", minWidth: 150, editable: true },
    { field: "location", minWidth: 150, editable: true },
    {
      field: "price",
      minWidth: 100,
      editable: true,
      cellRenderer: (params: { value: string }) => `${params.value} €`,
      // valueParser is used to validate the input value
      valueParser: (params: { newValue: string; oldValue: number }) => {
        const num = Number(params.newValue);
        if (isNaN(num) || num < 0 || num > 99) {
          return params.oldValue;
        }
        return num;
      },
      // Custom cell editor, if above 99 or below 0 the cell turns red
      cellEditor: "agNumberCellEditor",
      cellEditorParams: {
        min: 0,
        max: 99,
      },
    },
    {
      field: "date",
      minWidth: 150,
      editable: true,
      cellEditor: DateTimeEditor,
      valueFormatter: (params: { value: string }) => {
        const date = new Date(params.value);
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return `${months[date.getMonth()]} ${date.getDate().toString().padStart(2, "0")} ${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;
      },
    }
  ]);

  const onGridReady = useCallback((params: GridReadyEvent) => {
    params.api.sizeColumnsToFit();

    // Add window resize listener
    window.addEventListener("resize", () => {
      setTimeout(() => {
        params.api.sizeColumnsToFit();
      });
    });
  }, []);

  return (
    <div className="mx-auto max-w-[95vw] ag-theme-quartz">
          <h1 className="ps-0">Events</h1>
    
      <button
        onClick={() => handleShowForm()}
        className=" mb-6 px-4 py-2 bg-primary-500 text-white rounded hover:bg-primary-600"
        >
        Add Event
      </button>
        {showForm && (
            <Form handleCreate={handleCreate} newEvent={newEvent} setNewEvent={setNewEvent} handleShowForm={handleShowForm} />
        )}
        <AgGridReact
          rowData={events}
          columnDefs={colDefs}
          defaultColDef={defaultColDef}
          domLayout="autoHeight"
          onGridReady={onGridReady}
          onCellValueChanged={onCellValueChanged}
        />
      </div>
  );
};

export default Crud;
