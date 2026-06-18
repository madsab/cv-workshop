import { useState } from "react";
import styles from "./Experiences.module.css";
import { CxOption, CxSelect } from "@computas/designsystem/select/react";
import { experienceTypeMap } from "../types/experienceTypes";
import { useExperiences } from "../hooks/useExperiences";
import { useMeme } from "../hooks/useMeme";
import { ExperienceCard } from "../components/experiences/ExperienceCard";
import { useKanye } from "../hooks/useKanye";
import { Experience } from "../types";

export default function Experiences() {
  const [selectedExperienceType, setSelectedExperienceType] = useState<
    string | null
  >(null);

  // TODO Oppgave 1.1 of 1.2: Håndter loading og error av erfaringer
  const { data: experiences } = useExperiences();
  const { data: meme } = useMeme();
  const { data: kanyeQuote } = useKanye();

  if (!experiences || experiences.length === 0) {
    return <div className={styles.noExperiences}>{kanyeQuote?.quote}</div>;
  }

  const handleSelectChange = (e: Event) => {
    const customEvent = e as CustomEvent;
    const selectedFilter = customEvent.detail.value;
    console.log(selectedFilter);
    // TODO Oppgave 5.1: Filtrer experiences etter type
    setSelectedExperienceType(selectedFilter);
  };

  const filteredExperiences = () => {
    const validTypes = Object.keys(experienceTypeMap).filter(
      (type) => type !== "other",
    );

    if (selectedExperienceType === "other") {
      return experiences.filter(
        (experience) => !validTypes.includes(experience.type.toLowerCase()),
      );
    } else if (selectedExperienceType) {
      return experiences.filter(
        (experience) =>
          experience.type.toLowerCase() ===
          selectedExperienceType.toLowerCase(),
      );
    }
    return experiences;
  };

  return (
    <div className={styles.container}>
      <div className={styles.select}>
        <label className="cx-form-field">
          <div className="cx-form-field__input-container">
            <CxSelect onChange={handleSelectChange}>
              <CxOption value="">Ingen filtrering</CxOption>
              {Object.entries(experienceTypeMap).map(([type, data]) => (
                <CxOption key={type} value={type}>
                  {data.text}
                </CxOption>
              ))}
            </CxSelect>
          </div>
        </label>
      </div>
      <div className={styles.experiences}>
        <div>
          {meme?.template.url && (
            <img src={meme.template.url} alt="Meme" className={styles.img} />
          )}
        </div>
        <>
          {filteredExperiences().map((ex) => (
            <ExperienceCard experience={ex} />
          ))}
        </>
      </div>
    </div>
  );
}
