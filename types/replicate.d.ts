declare module "replicate" {
  interface ReplicateOptions {
    auth: string;
  }

  interface PredictionInput {
    [key: string]: any;
  }

  interface PredictionOutput {
    [key: string]: any;
  }

  interface PredictionResponse {
    id: string;
    status: "starting" | "processing" | "succeeded" | "failed" | "canceled";
    output: any[];
    error?: string;
    [key: string]: any;
  }

  interface PredictionsAPI {
    create(options: {
      model: string;
      input: PredictionInput;
    }): Promise<PredictionResponse>;
    get(id: string): Promise<PredictionResponse>;
  }

  class Replicate {
    constructor(options: ReplicateOptions);
    predictions: PredictionsAPI;
  }

  export default Replicate;
}
