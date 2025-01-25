import ax from "../conf/ax";
import conf from "../conf/main";

export const updateScoreCondition = (scores) => {
  return scores.map(async (score) => {
    if (score.status === "delete") {
      await ax.delete(conf.scoreDeleteEndpoint(score.documentId));
    } else if (score.documentId) {
      await ax.put(conf.scoreUpdateEndpoint(score.documentId), {
        data: score.data,
      });
    } else {
      await ax.post(conf.scoreCreateEndpoint, { data: score.data });
    }
  });
};
