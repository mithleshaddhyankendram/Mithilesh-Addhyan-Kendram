# Deployment steps

## 1. Dashboard (GitHub Pages)
The dashboard is at `/ai-business-assistant/` under the existing MAK GitHub Pages site if the repository's Pages source publishes the `main` branch root:
`https://mithleshaddhyankendram.github.io/Mithilesh-Addhyan-Kendram/ai-business-assistant/`

This path is expected based on the existing site URL in the repository README, but it has not been verified live from this environment. If it returns 404, open repository Settings → Pages and check the configured publishing source. Do not change the existing site's publishing source to a workflow that publishes only this folder, because that could replace the current site.

## 2. Backend (Render)
1. Sign in to Render and choose **New → Blueprint**.
2. Connect the GitHub repository `mithleshaddhyankendram/Mithilesh-Addhyan-Kendram` and select the branch `main`.
3. Render should detect `ai-business-assistant/render.yaml`. Create the service.
4. In the backend service's Environment settings, set `OPENAI_API_KEY` to your provider key and `OPENAI_MODEL` to a model available to that key. Keep these values in Render only; never put them in the HTML or GitHub.
5. Ensure `ALLOWED_ORIGINS` is set to `https://mithleshaddhyankendram.github.io` and deploy. Render assigns a service URL like `https://your-service.onrender.com`.
6. Test `https://your-service.onrender.com/health`; expect JSON with `ok: true`.
7. Open the dashboard URL, enter the Render service URL in **Backend API URL**, save it in that browser, and test the Content Studio.

## Important
- Render service creation and API key entry require your own Render account authorization; this repository cannot do those steps on your behalf.
- A free backend host may sleep when idle and take a little time to wake.
- OpenAI API usage may be billed separately from hosting.
- The lead pipeline and metrics are still sample data; no CRM, email, or social media account is connected.
