### Demo link
[Demo link](http://wonderful-songs.surge.sh).

Current version features:
- Some test D3 charts
- An input field where if you enter tickers such as A/GOOG/AAPL, it will make a api call to a open public api to get the ticker's historical prices. The retrived data is printed as a json at the bottom of the page (You will probably have to scroll)

Next version features:
- Put the D3 Test charts and retrived json data together to display the retrieved data as a D3 line chart.

### Project requirements
To create a single page application which displays Ticker price historical information.
Use technologies:
- React
- D3 for visualization

### The purpose of this project
The purpose of this project is simply for studying.

To learn about:
- The latest CRA (as per July 2019). (as I have not done React for 9 months.)
- React Hooks
- D3
- Using Visual Studio Code to do it. (as I am used to using IntelliJ)

### Fixed bugs
Fixed:
- When the input field is empty it makes a call to https://financialmodelingprep.com/api/v3/historical-price-full/. It should not.


### Outstanding bugs and backlog

Bugs:
- The debounce on the input field does not work when letters are deleted. The last letter is kept. so the JSON component never clears to 'null'
- Actually the debounce is on the wrong thing. It should be debouncing the input. Not debouncing the api call. Currently it is debouncing the api call. Need to fix.

Backlog:
- Needs loader spinner for when the ticker api call is in progress
- Needs better error message formatting for when the ticker is invalid
- Implement StyledComponent themes so we can use css variables for colors etc.

### Appendix

Appendix
- This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

