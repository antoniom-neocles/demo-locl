/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ɵParsedMessage } from '@angular/localize';
import { TranslationSerializer } from './translation_serializer';
import { XmlFile } from './xml_file';

export class Xliff1TranslationSerializer implements TranslationSerializer {
  renderFile(
    messages: ɵParsedMessage[],
    locale: string,
    isTarget = false
  ): string {
    const xml = new XmlFile();
    const tagName = isTarget ? 'target' : 'source';
    xml.startTag('xliff', {
      version: '1.2',
      xmlns: 'urn:oasis:names:tc:xliff:document:1.2'
    });
    xml.startTag('file', {
      [isTarget ? 'target-language' : 'source-language']: locale,
      datatype: 'plaintext'
    });
    xml.startTag('body');
    messages.forEach(message => {
      xml.startTag('trans-unit', { id: message.messageId, datatype: 'html' });
      xml.startTag(tagName, {}, { preserveWhitespace: true });
      this.renderMessage(xml, message);
      xml.endTag(tagName, { preserveWhitespace: false });
      if (message.description) {
        this.renderNote(xml, 'description', message.description);
      }
      if (message.meaning) {
        this.renderNote(xml, 'meaning', message.meaning);
      }
      xml.endTag('trans-unit');
    });
    xml.endTag('body');
    xml.endTag('file');
    xml.endTag('xliff');
    return xml.toString();
  }

  private renderMessage(xml: XmlFile, message: ɵParsedMessage): void {
    xml.text(message.messageParts[0]);
    for (let i = 1; i < message.messageParts.length; i++) {
      xml.startTag(
        'x',
        { id: message.placeholderNames[i - 1] },
        { selfClosing: true }
      );
      xml.text(message.messageParts[i]);
    }
  }

  private renderNote(xml: XmlFile, name: string, value: string) {
    xml.startTag(
      'note',
      { priority: '1', from: name },
      { preserveWhitespace: true }
    );
    xml.text(value);
    xml.endTag('note', { preserveWhitespace: false });
  }
}
