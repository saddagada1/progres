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

export interface SessionSchema {
  sessionid: number;
  sessioninstitution: number;
  sessioninstitutionname: string;
  sessionname: string;
  sessionstartdate: string;
  sessionenddate: string;
  sessionicon: string;
  sessionstatus: string;
  sessiongpa: number | null;
}

export interface SemesterSchema {
  semesterid: number;
  semestersession: number;
  semestersessionname: string;
  semestername: string;
  semesterstartdate: string;
  semesterenddate: string;
  semestericon: string;
  semesterstatus: string;
  semestergpa: number | null;
}

interface DataValues {
  institutions: InstitutionSchema[];
  createInstitution: (
    name: string,
    startDate: string,
    endDate: string,
    icon: string,
    status: string,
    gpa?: number
  ) => void;
  sessions: SessionSchema[];
  createSession: (
    institutionId: number,
    institutionName: string,
    name: string,
    startDate: string,
    endDate: string,
    icon: string,
    status: string,
    gpa?: number
  ) => void;
  semesters: SemesterSchema[];
  createSemester: (
    sessionId: number,
    sessionName: string,
    name: string,
    startDate: string,
    endDate: string,
    icon: string,
    status: string,
    gpa?: number
  ) => void;
  loading: boolean;
}

const DataContext = createContext<DataValues | null>(null);

interface DataProviderProps {
  children: React.ReactNode;
}

const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [institutions, setInstitutions] = useState<InstitutionSchema[]>([]);
  const [sessions, setSessions] = useState<SessionSchema[]>([]);
  const [semesters, setSemesters] = useState<SemesterSchema[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchInstitutions = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM institution",
        undefined,
        (txObj, resultSet) => {
          setInstitutions(resultSet.rows._array);
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

  const fetchSessions = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM session",
        undefined,
        (txObj, resultSet) => {
          setSessions(resultSet.rows._array);
        },
        (txObj, error) => {
          console.log("Error", error);
          return false;
        }
      );
    });
  };

  const createSession = (
    institutionId: number,
    institutionName: string,
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
          ? "INSERT INTO session (sessioninstitution, sessioninstitutionname, sessionname, sessionstartdate, sessionenddate, sessionicon, sessionstatus, sessiongpa) values (?, ?, ?, ?, ?, ?, ?, ?)"
          : "INSERT INTO session (sessioninstitution, sessioninstitutionname, sessionname, sessionstartdate, sessionenddate, sessionicon, sessionstatus) values (?, ?, ?, ?, ?, ?, ?)",
        gpa
          ? [
              institutionId,
              institutionName,
              name,
              startDate,
              endDate,
              icon,
              status,
              gpa,
            ]
          : [
              institutionId,
              institutionName,
              name,
              startDate,
              endDate,
              icon,
              status,
            ],
        (txObj, resultSet) => {
          console.log(resultSet);
          if (resultSet.insertId !== undefined) {
            setSessions([
              ...sessions,
              {
                sessionid: resultSet.insertId,
                sessioninstitution: institutionId,
                sessioninstitutionname: institutionName,
                sessionname: name,
                sessionstartdate: startDate,
                sessionenddate: endDate,
                sessionicon: icon,
                sessionstatus: status,
                sessiongpa: gpa ? gpa : null,
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
          setSemesters(resultSet.rows._array);
        },
        (txObj, error) => {
          console.log("Error", error);
          return false;
        }
      );
    });
  };

  const createSemester = (
    sessionId: number,
    sessionName: string,
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
          ? "INSERT INTO semester (semestersession, semestersessionname, semestername, semesterstartdate, semesterenddate, semestericon, semesterstatus, semestergpa) values (?, ?, ?, ?, ?, ?, ?, ?)"
          : "INSERT INTO semester (semestersession, semestersessionname, semestername, semesterstartdate, semesterenddate, semestericon, semesterstatus) values (?, ?, ?, ?, ?, ?, ?)",
        gpa
          ? [
              sessionId,
              sessionName,
              name,
              startDate,
              endDate,
              icon,
              status,
              gpa,
            ]
          : [sessionId, sessionName, name, startDate, endDate, icon, status],
        (txObj, resultSet) => {
          console.log(resultSet);
          if (resultSet.insertId !== undefined) {
            setSemesters([
              ...semesters,
              {
                semesterid: resultSet.insertId,
                semestersession: sessionId,
                semestersessionname: sessionName,
                semestername: name,
                semesterstartdate: startDate,
                semesterenddate: endDate,
                semestericon: icon,
                semesterstatus: status,
                semestergpa: gpa ? gpa : null,
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

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(INSTITUTION);
      tx.executeSql(SESSION);
      tx.executeSql(SEMESTER);
    });

    //add check to see if table exists before fetching
    fetchInstitutions();
    fetchSessions();
    fetchSemesters();

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
    <DataContext.Provider
      value={{
        institutions,
        createInstitution,
        sessions,
        createSession,
        semesters,
        createSemester,
        loading,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = () => useContext(DataContext);

export default DataProvider;
