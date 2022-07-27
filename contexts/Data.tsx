import React, { createContext, useContext, useEffect, useState } from "react";
import * as SQLite from "expo-sqlite";
import { INSTITUTION, SEMESTER, SESSION } from "../sqlite/tables";

const db = SQLite.openDatabase("data");

export interface InstitutionSchema {
  institutionid: number;
  institutionname: string;
  institutionicon: string;
  institutionusecalculatedgpa: number;
  institutioncalculatedgpa: number | null;
  institutionsetgpa: number | null;
}

export interface SessionSchema {
  sessionid: number;
  sessioninstitution: number;
  sessioninstitutionname: string;
  sessionname: string;
  sessionicon: string;
  sessionusecalculatedgpa: number;
  sessioncalculatedgpa: number | null;
  sessionsetgpa: number | null;
}

export interface SemesterSchema {
  semesterid: number;
  semestersession: number;
  semestersessionname: string;
  semestername: string;
  semestericon: string;
  semesterusecalculatedgpa: number;
  semestercalculatedgpa: number | null;
  semestersetgpa: number | null;
}

interface DataValues {
  institutions: InstitutionSchema[];
  createInstitution: (
    name: string,
    icon: string,
    calcGpa: number,
    gpa?: number
  ) => void;
  updateInstitution: (
    id: number,
    name: string,
    icon: string,
    calcGpa: number,
    gpa?: number
  ) => void;
  sessions: SessionSchema[];
  createSession: (
    institutionId: number,
    institutionName: string,
    name: string,
    icon: string,
    calcGpa: number,
    gpa?: number
  ) => void;
  updateSession: (
    id: number,
    name: string,
    icon: string,
    calcGpa: number,
    gpa?: number
  ) => void;
  semesters: SemesterSchema[];
  createSemester: (
    sessionId: number,
    sessionName: string,
    name: string,
    icon: string,
    calcGpa: number,
    gpa?: number
  ) => void;
  updateSemester: (
    id: number,
    name: string,
    icon: string,
    calcGpa: number,
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
    icon: string,
    calcGpa: number,
    gpa?: number
  ) => {
    db.transaction((tx) => {
      tx.executeSql(
        gpa
          ? "INSERT INTO institution (institutionname, institutionicon, institutionusecalculatedgpa, institutionsetgpa) values (?, ?, ?, ?)"
          : "INSERT INTO institution (institutionname, institutionicon, institutionusecalculatedgpa) values (?, ?, ?)",
        gpa ? [name, icon, calcGpa, gpa] : [name, icon, calcGpa],
        (txObj, resultSet) => {
          console.log(resultSet);
          if (resultSet.insertId !== undefined) {
            setInstitutions([
              ...institutions,
              {
                institutionid: resultSet.insertId,
                institutionname: name,
                institutionicon: icon,
                institutionusecalculatedgpa: calcGpa,
                institutioncalculatedgpa: null,
                institutionsetgpa: gpa ? gpa : null,
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

  const updateInstitution = (
    id: number,
    name: string,
    icon: string,
    calcGpa: number,
    gpa?: number
  ) => {
    db.transaction((tx) => {
      tx.executeSql(
        gpa
          ? "UPDATE institution SET institutionname = ?, institutionicon = ?, institutionusecalculatedgpa = ?, institutionsetgpa = ? WHERE institutionid = ?"
          : "UPDATE institution SET institutionname = ?, institutionicon = ?, institutionusecalculatedgpa = ? WHERE institutionid = ?",
        gpa ? [name, icon, calcGpa, gpa, id] : [name, icon, calcGpa, id],
        (txObj, resultSet) => {
          console.log(resultSet);
          fetchInstitutions();
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
    icon: string,
    calcGpa: number,
    gpa?: number
  ) => {
    db.transaction((tx) => {
      tx.executeSql(
        gpa
          ? "INSERT INTO session (sessioninstitution, sessioninstitutionname, sessionname, sessionicon, sessionusecalculatedgpa, sessionsetgpa) values (?, ?, ?, ?, ?, ?)"
          : "INSERT INTO session (sessioninstitution, sessioninstitutionname, sessionname, sessionicon, sessionusecalculatedgpa) values (?, ?, ?, ?, ?)",
        gpa
          ? [institutionId, institutionName, name, icon, calcGpa, gpa]
          : [institutionId, institutionName, name, icon, calcGpa],
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
                sessionicon: icon,
                sessionusecalculatedgpa: calcGpa,
                sessioncalculatedgpa: null,
                sessionsetgpa: gpa ? gpa : null,
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

  const updateSession = (
    id: number,
    name: string,
    icon: string,
    calcGpa: number,
    gpa?: number
  ) => {
    db.transaction((tx) => {
      tx.executeSql(
        gpa
          ? "UPDATE session SET sessionname = ?, sessionicon = ?, sessionusecalculatedgpa = ?, sessionsetgpa = ? WHERE sessionid = ?"
          : "UPDATE session SET sessionname = ?, sessionicon = ?, sessionusecalculatedgpa = ? WHERE sessionid = ?",
        gpa ? [name, icon, calcGpa, gpa, id] : [name, icon, calcGpa, id],
        (txObj, resultSet) => {
          console.log(resultSet);
          fetchSessions();
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
    icon: string,
    calcGpa: number,
    gpa?: number
  ) => {
    db.transaction((tx) => {
      tx.executeSql(
        gpa
          ? "INSERT INTO semester (semestersession, semestersessionname, semestername, semestericon, semesterusecalculatedgpa, semestersetgpa) values (?, ?, ?, ?, ?, ?)"
          : "INSERT INTO semester (semestersession, semestersessionname, semestername, semestericon, semesterusecalculatedgpa) values (?, ?, ?, ?, ?)",
        gpa
          ? [sessionId, sessionName, name, icon, calcGpa, gpa]
          : [sessionId, sessionName, name, icon, calcGpa],
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
                semestericon: icon,
                semesterusecalculatedgpa: calcGpa,
                semestercalculatedgpa: null,
                semestersetgpa: gpa ? gpa : null,
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

  const updateSemester = (
    id: number,
    name: string,
    icon: string,
    calcGpa: number,
    gpa?: number
  ) => {
    db.transaction((tx) => {
      tx.executeSql(
        gpa
          ? "UPDATE semester SET semestername = ?, semestericon = ?, semesterusecalculatedgpa = ?, semestersetgpa = ? WHERE semesterid = ?"
          : "UPDATE semester SET semestername = ?, semestericon = ?, semesterusecalculatedgpa = ? WHERE semesterid = ?",
        gpa ? [name, icon, calcGpa, gpa, id] : [name, icon, calcGpa, id],
        (txObj, resultSet) => {
          console.log(resultSet);
          fetchSemesters();
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

    // db.transaction((tx) => {
    //     tx.executeSql(
    //       "DROP TABLE institution"
    //     );
    //     tx.executeSql(
    //       "DROP TABLE session"
    //     );
    //     tx.executeSql(
    //       "DROP TABLE semester"
    //     );
    //   });
  }, []);

  return (
    <DataContext.Provider
      value={{
        institutions,
        createInstitution,
        updateInstitution,
        sessions,
        createSession,
        updateSession,
        semesters,
        createSemester,
        updateSemester,
        loading,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = () => useContext(DataContext);

export default DataProvider;
