import * as fs from "fs"
import * as path from "path"

async function check() {
  console.log("checking FL .json files")

  const directory = "./lang/"
  const enFilePath = path.join(directory, "en.json")
  const enData = JSON.parse(fs.readFileSync(enFilePath, "utf8"))

  fs.readdirSync(directory).forEach((file) => {
    if (file.endsWith(".json") && file !== "en.json") {
      const targetFilePath = path.join(directory, file)
      const targetData = JSON.parse(fs.readFileSync(targetFilePath, "utf8"))

      for (const enKey in enData) {
        if (!targetData.hasOwnProperty(enKey)) {
          targetData[enKey] = {
            defaultMessage: enData[enKey].defaultMessage,
            description: enData[enKey].description,
            originalMessage: enData[enKey].defaultMessage,
          }
        }
      }

      fs.writeFileSync(targetFilePath, JSON.stringify(targetData, null, 2), "utf8")
      console.log(`${file} updated`)
    }
  })
}

export default check()
