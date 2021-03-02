class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {date: new Date()};
    }

    componentDidMount() {
        // run when component output rendered
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        this.setState({
            date: new Date()
        });
    }

    render() {
        return (
            <div>
                <h2>Hello, welcome to Shopee</h2>
                <h3>It is {this.state.date.toLocaleTimeString()}. Good time to buy something.</h3>
            </div>
        );
    }
};

class Product extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.nameProduct,
            quality: 0
        };
        this.handlePlus = this.handlePlus.bind(this);
        this.handleMinus = this.handleMinus.bind(this);
    }

    handlePlus() {
        this.setState(state => ({
            quality: state.quality + 1
        }));
    }

    handleMinus() {
        this.setState(state => ({
            quality: state.quality - 1
        }));
    }

    render() {
        let buttonMinus = undefined;
        if (this.state.quality > 0) {
            buttonMinus = <button onClick={this.handleMinus}>-</button>
        } else {
            buttonMinus = <label> - Out of stock</label>
        }
        return (
            <div key={this.props.id}>
                <label>{this.state.name}: {this.state.quality} </label>
                <button onClick={this.handlePlus}>+</button>
                {buttonMinus}
            </div>
        )
    }
}

class ListProduct extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            text: ''
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
    }

    handleClick() {
        if (this.state.text.length === 0) {
            return;
        }
        const new_product = {
            name: this.state.text,
            id: new Date()
        };
        this.setState(state => ({
            products: state.products.concat(new_product),
            text: '',
        }));
        console.log(this.state.products);
    }

    handleChange(e) {
        this.setState(state => ({
            text: e.target.value
        }));
    }

    handleRemove(e) {
        this.setState(state => ({
            products: state.products.filter(product => product.id != e.target.id)
        }));
    }

    render() {
        return (
            <div>
                <input type="text" onChange={this.handleChange} value={this.state.text}/>
                <button onClick={this.handleClick}>Add Product</button>
                {
                    this.state.products.map(
                        product => (
                            <div key={product.id}>
                                <span style={{ display: "flex" }}>
                                    <button onClick={this.handleRemove} id={product.id}>X</button>
                                    <Product id={product.id} nameProduct={product.name} />
                                </span>
                            </div>
                        )
                    )
                }
            </div>
        );
    }
}

const element = (
    <div>
        <Clock />
        <ListProduct />
    </div>
);

ReactDOM.render(
    element,
    document.querySelector('#root')
)