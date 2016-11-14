import { PksprojPage } from './app.po';

describe('pksproj App', function() {
  let page: PksprojPage;

  beforeEach(() => {
    page = new PksprojPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
