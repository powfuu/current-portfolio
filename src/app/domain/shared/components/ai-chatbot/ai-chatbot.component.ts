import { Component, OnInit, OnDestroy, ElementRef, ViewChild, AfterViewChecked, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatbotService } from '../../services/chatbot/chatbot.service';
import { UtilService } from '../../services/util/util.service';

interface ChatMessage {
  text: string;
  isUser: boolean;
  displayText?: string;
  isTyping?: boolean;
  originalQuery?: string;
  isWelcome?: boolean;
}

@Component({
  selector: 'app-ai-chatbot',
  templateUrl: './ai-chatbot.component.html',
  styleUrls: ['./ai-chatbot.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class AiChatbotComponent implements OnInit, AfterViewChecked, OnDestroy {
  @ViewChild('messagesContainer') messagesContainer!: ElementRef;
  @ViewChild('inputField') inputField!: ElementRef;

  messages: ChatMessage[] = [];
  userInput = '';
  isTyping = false;
  suggestedQuestions: string[] = [];

  private shouldScroll = false;
  private originalSetItem: ((key: string, value: string) => void) | null = null;
  private askedQuestions: Set<string> = new Set();
  private allQuestions: { es: string; en: string }[] = [];

  constructor(
    private chatbotService: ChatbotService,
    private utilService: UtilService,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    this.allQuestions = this.chatbotService.getSuggestedQuestions();
    this.loadSuggestions();
    this.addWelcomeMessage();
    this.listenLangChange();
  }

  ngOnDestroy(): void {
    if (this.originalSetItem) {
      localStorage.setItem = this.originalSetItem;
    }
  }

  private listenLangChange(): void {
    this.originalSetItem = localStorage.setItem.bind(localStorage);
    const self = this;
    const original = this.originalSetItem;
    localStorage.setItem = function (key: string, value: string) {
      original!(key, value);
      if (key === 'lang') {
        self.ngZone.run(() => self.onLanguageChanged());
      }
    };
  }

  private onLanguageChanged(): void {
    this.loadSuggestions();
    this.retranslateMessages();
  }

  private retranslateMessages(): void {
    for (const msg of this.messages) {
      if (msg.isUser) continue;

      if (msg.isWelcome) {
        const welcome = this.getWelcome();
        msg.text = welcome;
        msg.displayText = welcome;
      } else if (msg.originalQuery) {
        const translated = this.chatbotService.getResponse(msg.originalQuery);
        msg.text = translated;
        msg.displayText = translated;
      }
    }
  }

  ngAfterViewChecked(): void {
    if (this.shouldScroll) {
      this.scrollToBottom();
      this.shouldScroll = false;
    }
  }

  sendMessage(): void {
    const text = this.userInput.trim();
    if (!text || this.isTyping) return;

    this.askedQuestions.add(text);
    this.messages.push({ text, isUser: true });
    this.userInput = '';
    this.shouldScroll = true;

    this.isTyping = true;
    const response = this.chatbotService.getResponse(text);

    setTimeout(() => {
      this.addBotMessageAnimated(response, text);
    }, 400 + Math.random() * 300);
  }

  askSuggested(question: string): void {
    this.askedQuestions.add(question);
    this.userInput = question;
    this.sendMessage();
  }

  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
  }

  private addWelcomeMessage(): void {
    const text = this.getWelcome();
    this.messages.push({ text, isUser: false, displayText: text, isWelcome: true });
    this.shouldScroll = true;
  }

  private isMobile(): boolean {
    return window.innerWidth < 600;
  }

  private addBotMessageAnimated(text: string, originalQuery: string): void {
    if (this.isMobile()) {
      const msg: ChatMessage = { text, isUser: false, displayText: text, isTyping: false, originalQuery };
      this.messages.push(msg);
      this.isTyping = false;
      this.loadSuggestions();
      this.shouldScroll = true;
      setTimeout(() => { this.scrollToBottom(); }, 50);
      return;
    }

    const msg: ChatMessage = { text, isUser: false, displayText: '', isTyping: true, originalQuery };
    this.messages.push(msg);
    this.shouldScroll = true;

    const plainText = text.replace(/<[^>]*>/g, '');
    let i = 0;

    const interval = setInterval(() => {
      this.ngZone.run(() => {
        if (i < plainText.length) {
          i++;
          let built = '';
          let plainCount = 0;
          let j = 0;
          while (plainCount < i && j < text.length) {
            if (text[j] === '<') {
              const closeIdx = text.indexOf('>', j);
              built += text.substring(j, closeIdx + 1);
              j = closeIdx + 1;
            } else {
              built += text[j];
              plainCount++;
              j++;
            }
          }
          const openTags = built.match(/<b>/g)?.length || 0;
          const closeTags = built.match(/<\/b>/g)?.length || 0;
          if (openTags > closeTags) built += '</b>';

          msg.displayText = built;
          this.scrollToBottom();
        } else {
          msg.displayText = text;
          msg.isTyping = false;
          this.isTyping = false;
          this.loadSuggestions();
          this.shouldScroll = true;
          clearInterval(interval);
          setTimeout(() => { this.scrollToBottom(); }, 150);
        }
      });
    }, 8);
  }

  private scrollToBottom(): void {
    if (this.messagesContainer) {
      const el = this.messagesContainer.nativeElement;
      el.scrollTop = el.scrollHeight;
      requestAnimationFrame(() => {
        el.scrollTop = el.scrollHeight;
      });
    }
  }

  private getWelcome(): string {
    const msg = this.chatbotService.getWelcomeMessage();
    return this.utilService.langIsEs() ? msg.es : msg.en;
  }

  private loadSuggestions(): void {
    const isEs = this.utilService.langIsEs();
    const available = this.allQuestions
      .map(s => isEs ? s.es : s.en)
      .filter(q => !this.askedQuestions.has(q));

    const shuffled = available.sort(() => Math.random() - 0.5);
    this.suggestedQuestions = shuffled.slice(0, 5);
  }

  getPlaceholder(): string {
    return this.utilService.langIsEs()
      ? 'Pregúntame sobre Everit...'
      : 'Ask me about Everit...';
  }
}
