var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import './app.component';
describe('bronco-button', () => {
    let element;
    beforeEach(() => __awaiter(this, void 0, void 0, function* () {
        element = document.createElement('bronco-button');
        document.body.appendChild(element);
        yield element.updateComplete;
    }));
    afterEach(() => { element.remove(); });
    it('should render bronco-button', () => __awaiter(this, void 0, void 0, function* () {
        document.body.appendChild(element);
        yield element.updateComplete;
        expect(element.textContent).toBe('');
    }));
    it('should emit click event', () => __awaiter(this, void 0, void 0, function* () {
        document.body.appendChild(element);
        yield element.updateComplete;
        element.emit();
        let bool = false;
        element.addEventListener('click', () => {
            bool = true;
        });
        element.click();
        expect(bool).toBe(true);
    }));
});
//# sourceMappingURL=app.component.spec.js.map