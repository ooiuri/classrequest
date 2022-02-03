import { ClassItem } from "@/interfaces/classes";
import { useProfile } from "context/Profile";
import { useState } from "react";
import styles from "./style.module.css";

interface SemesterColumnInterface {
  semesterClasses: ClassItem[];
  seen: Record<string, ClassItem>;
}

const SemesterColumn = ({ semesterClasses, seen }: SemesterColumnInterface) => {
  const { updateClassesTaken } = useProfile();
  return (
    <div>
      {semesterClasses.map((classItem: ClassItem, id) => {
        const style =
          seen && seen[classItem.code]
            ? {
                background: "green",
                color: "white",
              }
            : {};

        return (
          <div
            onClick={() => updateClassesTaken(classItem)}
            key={id}
            className={styles.classBox}
            style={style}
          >
            <div className={styles.classNameTitle}>
              <strong>{classItem.name} </strong>
            </div>

            <div className={styles.hoursBoxes}>
              <div>
                <strong>{classItem.classHrs}</strong>
              </div>
              <div>
                <strong>{classItem.labHrs}</strong>
              </div>
              <div style={{ color: "red" }}>
                <strong>{classItem.totalHrs}</strong>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SemesterColumn;
