import { By } from '@angular/platform-browser';
import { ComponentFixture } from '@angular/core/testing';
import { DebugElement } from '@angular/core';

export function getElement(fixture: ComponentFixture<any>, selector: string): any {
    return fixture.debugElement.query(By.css(selector)).nativeElement;
}

export function getAllElements(fixture: ComponentFixture<any>, selector: string): DebugElement[] {
    return fixture.debugElement.queryAll(By.css(selector));
}

export function clickedElement(fixture: ComponentFixture<any>, selector: string): void {
    getElement(fixture, selector).click();
}

export function getAllClasses(fixture: ComponentFixture<any>, selector: string): string {
    let allClass = fixture.debugElement.query(By.css(selector)).classes;
    let classList = Object.keys(allClass);
    return classList.join(' ');
}

export function getTagName(fixture: ComponentFixture<any>, selector: string): string {
    return fixture.debugElement.query(By.css(selector)).name;
}

export function contentElement(fixture: ComponentFixture<any>, selector: string): any {
    return getElement(fixture, selector)?.textContent;
}

export function getAttributeContent(fixture: ComponentFixture<any>, selector: string, attribute: string | string[]): any {
    let element = getElement(fixture, selector);
    let attributes = {};
    if (Array.isArray(attribute)) {
        attribute.forEach(attr => {
            attributes[attr] = element.getAttribute(attr);
        });
        return attributes;
    }
    else {
        return element.getAttribute(attribute);
    }

}

export function changeInputValue(fixture: ComponentFixture<any>, selector: string, value: any): void {
    let element = getElement(fixture, selector);
    element.value = value;
    element.dispatchEvent(new Event('input'));
    // fixture.detectChanges();
}

export function getValueInput(fixture: ComponentFixture<any>, selector: string){
    return getElement(fixture, selector)?.value;
}
 