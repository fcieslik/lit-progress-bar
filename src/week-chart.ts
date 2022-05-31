import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('fc-summary')
export class Summary extends LitElement {
  @property()
  currentValue: number = 0;

  @property()
  goal: number = 0;

  static styles = css`
    span {
      color: var(--colors-text-contrast);
    }
  `;

  render() {
    return html`<span>${`${this.currentValue} / ${this.goal}`}</span>`;
  }
}

@customElement('fc-percentage')
export class Percentage extends LitElement {
  @property()
  currentValue: number = 0;

  @property()
  goal: number = 0;

  static styles = css`
    h2 {
      color: var(--colors-accent-2);
    }
  `;

  render() {
    return html`<h2>${(this.currentValue * 100) / this.goal}%</h2>`;
  }
}

@customElement('fc-bar')
export class Bar extends LitElement {
  @property()
  currentValue: number = 0;

  @property()
  goal: number = 0;

  static styles = css`
    .bar {
      width: 100%;
      background-color: white;
      height: 12px;
      border-radius: 10px;
      position: relative;
    }

    .inner-bar {
      background-color: var(--colors-accent-2);
      height: 12px;
      border-radius: 10px;
      position: absolute;
    }
  `;

  render() {
    return html`<div class="bar">
      <div class="inner-bar" style="width: ${(this.currentValue * 100) / this.goal}%"></div>
    </div>`;
  }
}

@customElement('fc-progress')
export class WeekChart extends LitElement {
  static styles = css`
    slot {
      color: var(--colors-text-headers);
    }

    .wrapper {
      background-color: var(--colors-background);
      border-radius: 12px;
      max-width: 400px;
    }

    .details {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  `;

  @property({ type: Number })
  currentValue: number = 0;

  @property({ type: Number })
  goal: number = 0;

  render() {
    return html`
      <div class="wrapper">
        <slot></slot>
        <div class="details">
          <fc-percentage .goal="${this.goal}" .currentValue="${this.currentValue}"></fc-percentage>
          <fc-summary .goal="${this.goal}" .currentValue="${this.currentValue}"></fc-summary>
        </div>
        <fc-bar .goal="${this.goal}" .currentValue="${this.currentValue}"></fc-bar>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'week-chart': WeekChart;
  }
}
