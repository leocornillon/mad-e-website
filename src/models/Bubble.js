
export default class Bubble {

    _diameter;
    _x;
    _y;
    _vx;
    _vy;
    _vxOriginal;
    _vyOriginal;
    _gradientAngle;
    _friction;


    constructor(diameter, x, y, vx, vy, vxOriginal, vyOriginal, gradientAngle, friction) {
        this._diameter = diameter;
        this._x = x;
        this._vx = vx;
        this._vxOriginal = vx;
        this._y = y;
        this._vy = vy;
        this._vyOriginal = vy;
        this._friction = friction;
        this._vxOriginal = vxOriginal;
        this._vyOriginal = vyOriginal;
        this._gradientAngle = gradientAngle;
    }


    get gradientAngle() {
        return this._gradientAngle;
    }

    set gradientAngle(value) {
        this._gradientAngle = value;
    }

    get vxOriginal() {
        return this._vxOriginal;
    }

    set vxOriginal(value) {
        this._vxOriginal = value;
    }

    get vyOriginal() {
        return this._vyOriginal;
    }

    set vyOriginal(value) {
        this._vyOriginal = value;
    }

    get x() {
        return this._x;
    }

    set x(value) {
        this._x = value;
    }

    get y() {
        return this._y;
    }

    set y(value) {
        this._y = value;
    }

    get friction() {
        return this._friction;
    }

    set friction(value) {
        this._friction = value;
    }

    get diameter() {
        return this._diameter;
    }

    set diameter(value) {
        this._diameter = value;
    }

    get vy() {
        return this._vy;
    }

    set vy(value) {
        this._vy = value;
    }

    get vx() {
        return this._vx;
    }

    set vx(value) {
        this._vx = value;
    }
}