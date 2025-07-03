// Tests for troisiemeExo
const { troisiemeExo } = require('./exercices');


// Mock createMissionButtons
const createMissionButtons = jest.fn();

beforeEach(() => {
    // Arrange
    document.body.innerHTML = `
        <div id="result"></div>
        <input id="html" />
        <input id="css" />
        <input id="js" />
        <input id="php" />
    `;
    createMissionButtons.mockClear();
    window.createMissionButtons = createMissionButtons;
});

afterEach(() => {
    document.body.innerHTML = '';
});

test('HTML < 50, total > 12.5: triggers HTML mission', () => {

    // Arrange
    document.getElementById('html').value = "30";
    document.getElementById('css').value = "60";
    document.getElementById('js').value = "60";
    document.getElementById('php').value = "60";

    // Act
    troisiemeExo();

    // Assert
    expect(document.getElementById('result').innerHTML).toContain("Vous êtes débutant et un peu dispersé.");
    expect(createMissionButtons).toHaveBeenCalledWith("HTML");
});

test('HTML < 50, total <= 12.5: triggers beginner but focused', () => {

    // Arrange
    document.getElementById('html').value = "10";
    document.getElementById('css').value = "10";
    document.getElementById('js').value = "10";
    document.getElementById('php').value = "10";

    // Act
    troisiemeExo();

    // Assert
    expect(document.getElementById('result').innerHTML).toContain("Débutant mais concentré");
    expect(createMissionButtons).not.toHaveBeenCalled();
});

test('HTML in [50,75), CSS < 50: triggers CSS mission', () => {

    // Arrange
    document.getElementById('html').value = "60";
    document.getElementById('css').value = "40";
    document.getElementById('js').value = "80";
    document.getElementById('php').value = "80";

    // Act
    troisiemeExo();

    // Assert
    expect(document.getElementById('result').innerHTML).toContain("Intermédiaire en HTML, débutant en CSS.");
    expect(createMissionButtons).toHaveBeenCalledWith("CSS");
});

test('HTML in [50,75), CSS >= 50: triggers JavaScript mission', () => {

    // Arrange
    document.getElementById('html').value = "60";
    document.getElementById('css').value = "60";
    document.getElementById('js').value = "10";
    document.getElementById('php').value = "10";

    // Act
    troisiemeExo();

    // Assert
    expect(document.getElementById('result').innerHTML).toContain("Bon en HTML et CSS, mais débutez le JavaScript.");
    expect(createMissionButtons).toHaveBeenCalledWith("JavaScript");
});

test('HTML in [75,80), CSS < 75: triggers CSS mission', () => {

    // Arrange
    document.getElementById('html').value = "77";
    document.getElementById('css').value = "70";
    document.getElementById('js').value = "90";
    document.getElementById('php').value = "90";

    // Act
    troisiemeExo();

    // Assert
    expect(document.getElementById('result').innerHTML).toContain("Avancé en HTML, à renforcer en CSS.");
    expect(createMissionButtons).toHaveBeenCalledWith("CSS");
});

test('HTML in [75,80), CSS >= 75, JS < 75: triggers JavaScript mission', () => {

    // Arrange
    document.getElementById('html').value = "77";
    document.getElementById('css').value = "80";
    document.getElementById('js').value = "70";
    document.getElementById('php').value = "90";

    // Act
    troisiemeExo();

    // Assert
    expect(document.getElementById('result').innerHTML).toContain("HTML et CSS solides, mais JavaScript encore faible.");
    expect(createMissionButtons).toHaveBeenCalledWith("JavaScript");
});

test('HTML in [75,80), CSS >= 75, JS >= 75, PHP < 75: triggers PHP mission', () => {

    // Arrange
    document.getElementById('html').value = "77";
    document.getElementById('css').value = "80";
    document.getElementById('js').value = "80";
    document.getElementById('php').value = "70";

    // Act
    troisiemeExo();

    // Assert
    expect(document.getElementById('result').innerHTML).toContain("HTML, CSS et JS solides, mais PHP à améliorer.");
    expect(createMissionButtons).toHaveBeenCalledWith("PHP");
});

test('HTML in [75,80), all >= 75: very good level, no mission', () => {

    // Arrange
    document.getElementById('html').value = "77";
    document.getElementById('css').value = "80";
    document.getElementById('js').value = "80";
    document.getElementById('php').value = "80";

    // Act
    troisiemeExo();

    // Assert
    expect(document.getElementById('result').innerHTML).toContain("Très bon niveau global");
    expect(createMissionButtons).not.toHaveBeenCalled();
});

test('HTML >= 80, total > 76.25: expert, triggers Procrastination mission', () => {

    // Arrange
    document.getElementById('html').value = "90";
    document.getElementById('css').value = "90";
    document.getElementById('js').value = "90";
    document.getElementById('php').value = "90";

    // Act
    troisiemeExo();

    // Assert
    expect(document.getElementById('result').innerHTML).toContain("Vous êtes un expert en programmation !");
    expect(createMissionButtons).toHaveBeenCalledWith("Procrastination");
});

test('HTML >= 80, total <= 76.25: triggers continue progress', () => {

    // Arrange
    document.getElementById('html').value = "80";
    document.getElementById('css').value = "60";
    document.getElementById('js').value = "60";
    document.getElementById('php').value = "60";

    // Act
    troisiemeExo();

    // Assert
    expect(document.getElementById('result').innerHTML).toContain("Continuez à progresser sur tous les langages.");
    expect(createMissionButtons).not.toHaveBeenCalled();
});

test('HTML < 50, total = 12.5: triggers beginner but focused', () => {

    // Arrange
    document.getElementById('html').value = "0";
    document.getElementById('css').value = "10";
    document.getElementById('js').value = "20";
    document.getElementById('php').value = "20";

    // Act
    troisiemeExo();

    // Assert
    expect(document.getElementById('result').innerHTML).toContain("Débutant mais concentré");
    expect(createMissionButtons).not.toHaveBeenCalled();
});

test('HTML >= 80, total = 76.25: triggers continue progress', () => {

    // Arrange
    document.getElementById('html').value = "80";
    document.getElementById('css').value = "80";
    document.getElementById('js').value = "70";
    document.getElementById('php').value = "75";

    // Act
    troisiemeExo();

    // Assert
    expect(document.getElementById('result').innerHTML).toContain("Continuez à progresser sur tous les langages.");
    expect(createMissionButtons).not.toHaveBeenCalled();
});

test('handles non-integer and empty input values as NaN', () => {

    // Arrange
    document.getElementById('html').value = "";
    document.getElementById('css').value = "abc";
    document.getElementById('js').value = "10";
    document.getElementById('php').value = "20";

    // Act
    troisiemeExo();

    // Assert
    // NaN + NaN + 10 + 20 = NaN, so all comparisons fail, goes to last else
    expect(document.getElementById('result').innerHTML).toContain("Continuez à progresser sur tous les langages.");
    expect(createMissionButtons).not.toHaveBeenCalled();
});

test('throws if result div is missing', () => {

    // Arrange
    document.body.innerHTML = `
        <input id="html" />
        <input id="css" />
        <input id="js" />
        <input id="php" />
    `;

    // Act & Assert
    expect(() => troisiemeExo()).toThrow();
});
