import React, { createContext, useContext, useEffect, useState } from "react";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("data");

interface Semester {
  id: number | undefined;
  name: string;
  startDate: string;
  endDate: string;
  colour: string;
  gpa: number | null;
}

interface DataValues {
  semesters: Semester[];
  createSemester: (name: string, startDate: string, endDate: string, colour: string) => void
  loading: boolean;
}

const DataContext = createContext<DataValues | null>(null);

interface DataProviderProps {
  children: React.ReactNode;
}

const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [semesters, setSemesters] = useState<Semester[]>([]);
  const [loading, setLoading] = useState(true);

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
              id: resultSet.insertId,
              name,
              startDate,
              endDate,
              colour,
              gpa: null,
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
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS semester (semesterid INTEGER PRIMARY KEY AUTOINCREMENT, semestername TEXT NOT NULL, semesterstartdate TEXT NOT NULL, semesterenddate TEXT NOT NULL, semestercolour TEXT NOT NULL, semestergpa REAL)"
      );
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS course (courseid INTEGER PRIMARY KEY AUTOINCREMENT, coursesemester INTEGER NOT NULL, coursename TEXT NOT NULL, coursecolour TEXT NOT NULL, coursegpa REAL, FOREIGN KEY(coursesemester) REFERENCES semester(semesterid))"
      );
    });
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
    <DataContext.Provider value={{ semesters, createSemester, loading }}>
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = () => useContext(DataContext);

export default DataProvider;
