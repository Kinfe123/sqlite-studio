import { createDocsCloudAnalytics, defineDocs } from "@farming-labs/docs";

export default defineDocs({
  analytics: createDocsCloudAnalytics({
    console: false,
    includeInputs: false,
  }),
});
