import Header from '../table/formats/header'
import { randomID } from '../utils/id'

// should use formats/header. but table module rewrite header
export class HeaderWithID extends Header {
  static create(value: any) {
    const node = super.create(value)
    node.id = randomID()
    return node
  }
}
