import React, { useEffect, useState } from "react";
import { EditorPick } from "../interfaces/EditorPick.interface";
import { EditorPicksService } from "../services/editorPicks.service";

const EditorPicks: React.FC = () => {
  const [editorPicks, setEditorPicks] = useState<EditorPick[]>([]);
  const editorPicksService = new EditorPicksService();

  useEffect(() => {
    const fetchEditorPicks = async () => {
      const picks = await editorPicksService.getEditorPicks();
      setEditorPicks(picks);
    };

    fetchEditorPicks();
  }, []);

  return (
    <div className="editor-picks">
      <h2>Editor's Picks</h2>
      <div className="picks-grid">
        {editorPicks.map(
          (pick) =>
            pick.story && (
              <div key={pick.id} className="pick-card">
                <img src={pick.story.banner_image} alt={pick.story.title} />
                <h3>{pick.story.title}</h3>
                <p>{pick.story.subtitle}</p>
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default EditorPicks;
