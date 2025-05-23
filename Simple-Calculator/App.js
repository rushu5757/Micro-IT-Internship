import React, { Component } from 'react';
import './styles.css';
import ResultComponent from './components/ResultComponent';
import KeyPadComponent from './components/KeyPadComponent';
class App extends Component {
state = {
result: ""
}
onClick = button => {
if(button === "=") {
this.calculate();
}
else if(button === "C") {
this.reset();
}
else if(button === "del") {
this.backspace();
}
else {
this.setState({
result: this.state.result + button
})
}
};
calculate = () => {
var checkResult = ''
checkResult = this.state.result;
try {
this.setState({
result: (eval(checkResult)) })
}
catch(e) {
this.setState({
result: "error"
})
}
};
reset = () => {
this.setState({
result: ""
})
};
backspace = () => {
this.setState({
result: this.state.result.slice(0, -1)
})
};
render() {
return (
<div>
<div className="calculator-body">
<h1>Simple Calculator</h1>
<ResultComponent result={this.state.result} />
<KeyPadComponent onClick={this.onClick} />
</div>
</div>
)
}
}
export default App;
