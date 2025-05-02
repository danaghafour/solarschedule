export class SolarSetup {
    constructor(declination, azimuth, kwp, latidude, longitude) {
        this.declination = declination;
        this.azimuth = azimuth;
        this.kwp = kwp;
        (this.latitude = latidude), (this.longitude = longitude);
    }
}
