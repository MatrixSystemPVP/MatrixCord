import * as fs from 'fs'
import * as path from 'path'

export default class Util {
  static validateHex(hex: string): boolean {
    return RegExp(/^#[0-9A-F]{6}$/i).test(hex)
  }
  static traverseDir(dir: string): string[] {
    const files: string[] = []
    fs.readdirSync(dir).forEach((file) => {
      let fullPath = path.join(dir, file)
      if (fs.lstatSync(fullPath).isDirectory()) {
        this.traverseDir(fullPath).forEach((file) => files.push(file))
      } else {
        files.push(fullPath)
      }
    })
    return files
  }
}
