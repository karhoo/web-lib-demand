@Library(value="service-builder-shared-library@master", changelog=false) _
import com.karhoo.Constants

CICD {
  containerImages = [:]
  containerImages["builder"] = [name: 'karhoo-nodejs', tag:'0.0.1']
  helmCharts = []
  stepConfig = Constants.NO_DOCKER_IMAGE_NO_SCRATCH_ENV_NO_API_TESTS << [createGithubRelease: false]
  makeTargets = []
  scriptTargets = ["npm run setup-npm", "npm run bootstrap", "npm run lint", "npm run build", "npm run test", "npx lerna publish from-package --yes"]
  vaultEnvVars = [
    [key: "GITHUB_ACCESS_TOKEN", path: "kubernetes/scratch/jenkins-prod/jenkins", field: "github-registry-token"]
  ]
  pr = [
    scriptTargets: ["npm run setup-npm", "npm run bootstrap", "npm run lint", "npm run build", "npm run test"],
  ]
}
