import React, { createContext, useContext, useEffect, useState } from "react";
import * as SQLite from "expo-sqlite";
import { INSTITUTION, SEMESTER, SESSION } from "../sqlite/tables";

const db = SQLite.openDatabase("data");

export interface InstitutionSchema {
  institutionid: number;
  institutionname: string;
  institutionstartdate: string;
  institutionenddate: string;
  institutionicon: string;
  institutionstatus: string;
  institutiongpa: number | null;
}

export interface SemesterSchema {
  semesterid: number | undefined;
  semestername: string;
  semesterstartdate: string;
  semesterenddate: string;
  semestercolour: string;
  semestergpa: number | null;
}

interface DataValues {
  institutions: InstitutionSchema[];
  createInstitution: (name: string, startDate: string, endDate: string, icon: string, status: string, gpa?: number) => void
  semesters: SemesterSchema[];
  createSemester: (
    name: string,
    startDate: string,
    endDate: string,
    colour: string
  ) => void;
  loading: boolean;
}

const DataContext = createContext<DataValues | null>(null);

interface DataProviderProps {
  children: React.ReactNode;
}

const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [institutions, setInstitutions] = useState<InstitutionSchema[]>([]);
  const [semesters, setSemesters] = useState<SemesterSchema[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchInstitutions = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM institution",
        undefined,
        (txObj, resultSet) => {
          setInstitutions([...institutions, ...resultSet.rows._array]);
        },
        (txObj, error) => {
          console.log("Error", error);
          return false;
        }
      );
    });
  };

  const createInstitution = (
    name: string,
    startDate: string,
    endDate: string,
    icon: string,
    status: string,
    gpa?: number
  ) => {
    db.transaction((tx) => {
      tx.executeSql(
        gpa
          ? "INSERT INTO institution (institutionname, institutionstartdate, institutionenddate, institutionicon, institutionstatus, institutiongpa) values (?, ?, ?, ?, ?, ?)"
          : "INSERT INTO institution (institutionname, institutionstartdate, institutionenddate, institutionicon, institutionstatus) values (?, ?, ?, ?, ?)",
        gpa
          ? [name, startDate, endDate, icon, status, gpa]
          : [name, startDate, endDate, icon, status],
        (txObj, resultSet) => {
          console.log(resultSet);
          if (resultSet.insertId !== undefined) {
            setInstitutions([
              ...institutions,
              {
                institutionid: resultSet.insertId,
                institutionname: name,
                institutionstartdate: startDate,
                institutionenddate: endDate,
                institutionicon: icon,
                institutionstatus: status,
                institutiongpa: gpa ? gpa : null,
              },
            ]);
          }
        },
        (txObj, error) => {
          console.log("Error", error);
          return false;
        }
      );
    });
  };

  const fetchSemesters = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM semester",
        undefined,
        (txObj, resultSet) => {
          setSemesters([...semesters, ...resultSet.rows._array]);
        },
        (txObj, error) => {
          console.log("Error", error);
          return false;
        }
      );
    });
  };

  const createSemester = (
    name: string,
    startDate: string,
    endDate: string,
    colour: string
  ) => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO semester (semestername, semesterstartdate, semesterenddate, semestercolour) values (?, ?, ?, ?)",
        [name, startDate, endDate, colour],
        (txObj, resultSet) => {
          console.log(resultSet);
          setSemesters([
            ...semesters,
            {
              semesterid: resultSet.insertId,
              semestername: name,
              semesterstartdate: startDate,
              semesterenddate: endDate,
              semestercolour: colour,
              semestergpa: null,
            },
          ]);
        },
        (txObj, error) => {
          console.log("Error", error);
          return false;
        }
      );
    });
  };

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(INSTITUTION);
      tx.executeSql(SESSION);
      tx.executeSql(SEMESTER);
    });

    //add check to see if table exists before fetching
    fetchInstitutions();

    // fetchSemesters();
    // db.transaction((tx) => {
    //     tx.executeSql(
    //       "DROP TABLE semester"
    //     );
    //     tx.executeSql(
    //       "DROP TABLE course"
    //     );
    //   });
  }, []);

  return (
    <DataContext.Provider value={{ institutions, createInstitution, semesters, createSemester, loading }}>
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = () => useContext(DataContext);

export default DataProvider;
