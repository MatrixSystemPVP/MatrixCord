export default class Util {
  static validateHex(hex: string): boolean {
    return RegExp(/^#[0-9A-F]{6}$/i).test(hex)
  }
}
