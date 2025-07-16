import { EditorPick } from "../interfaces/EditorPick.interface";

export class EditorPicksService {
  async getEditorPicks(): Promise<EditorPick[]> {
    try {
      const response = await fetch(
        "http://api.agcnewsnet.com/api/general/editor-picks"
      );
      const json = await response.json();

      // Filter out entries with null stories
      return json.data.data.filter((pick: EditorPick) => pick.story !== null);
    } catch (error) {
      console.error("Error fetching editor picks:", error);
      return [];
    }
  }
}
