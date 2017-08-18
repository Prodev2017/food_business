import React, {Component} from 'react';
import Page_footercoming from './page_footercoming';
import queryString from 'query-string'
import './css/order_style.css';
import orderData from './sampleorder.json';

class Order_details extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            error: false,
            errorMsg: "",
            data: {
            }
        };
    }

    componentDidMount() {
        let query = queryString.parse(this.props.location.search);
        let orderId = Number(query.order_id);
        let userId = Number(query.user_id);
        console.log(query);
        if (orderId && userId) {
            let json = orderData;
            console.log(json);
            if (orderId === json.order_id && json.user.user_id==userId) {
                this.setState({loading: false, data: json})
            }
            else{
                this.setState({error: true, errorMsg: "Data not found"})
            }
        }
        else {
            this.setState({error: true, errorMsg: "Invalid query data"})
        }

    }

    counter = (direction, userId)=> {
        let data = this.state.data;
        let allBill = 0;
        data.orders.map((order, index) => {
                if (order.user == userId) {
                    if (direction === "down" && order.quantity > 1) {
                        order.quantity -= 1;
                    }
                    else if (direction === "up") {
                        order.quantity += 1
                    }
                    order.item_total = order.item_id.price * order.quantity;
                }
                allBill += order.item_total;
            }
        );
        data.order_bill = allBill;
        this.setState({
            data: data
        })

    };

    check = (userId) =>{
        let data = this.state.data;
        if (data[userId].checked === false) {
            data[userId].checked = true
        }
        else if (data[userId].checked === true) {
            data[userId].checked = false
        }
        this.setState({
            data: data
        })
    };

    render() {
        return (
            <div className="container order-main-block">
                <div className="col-md-10 col-md-offset-1">
                    {this.state.loading === false && this.state.error === false ?
                        <div className="row text-center">
                            <div className="col-md-3">
                                <div className="row order-left-block">
                                    <p className="header">{this.state.data.rest.name}</p>
                                    <p>{this.state.data.rest.street}</p>
                                    <hr/>
                                    <p>
                                        Cuisine:<br/>
                                        <span className="text">{this.state.data.rest.cuisine}</span>
                                    </p>
                                    <p>
                                        Hours:<br/>
                                        <span className="text">{this.state.data.rest.operation_hours}</span>
                                    </p>
                                    <p>
                                        Phone:<br/>
                                        <span className="text">{this.state.data.rest.phone}</span>
                                    </p>
                                </div>
                                <div className="row order-left-block">
                                    <p className="header">Order Details</p>
                                    <hr/>
                                    <p>
                                        Type:<br/>
                                        <span className="text">{this.state.data.order_type}</span>
                                    </p>
                                    <p>
                                        Amount to be paid:<br/>
                                        <span
                                            className="text">{parseFloat(this.state.data.order_bill).toFixed(2)}$</span>
                                    </p>
                                    <p>
                                        Members who paid:<br/>
                                        <span className="text">None</span>
                                    </p>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="row order-center-block">
                                    {this.state.data.orders.map((order, index) =>
                                        <div className="order_details">
                                            <table width={"100%"}>
                                                <thead>
                                                <tr>
                                                    <th width={"5%"}>
                                                    </th>
                                                    <th width={"55%"}>
                                                        {this.state.data.user.user_id === order.user ?
                                                            this.state.data.user.first_name + " " + this.state.data.user.last_name :
                                                            this.state.data.shared_users.map((user, index) => {
                                                                if (user.user_id === order.user) {
                                                                    return user.first_name + " " + user.last_name
                                                                }
                                                            })
                                                        }
                                                    </th>
                                                    <th width={"30%"}></th>
                                                    <th width={"10%"}>{parseFloat(order.item_total).toFixed(2)}$</th>
                                                    <th width={"5%"} data-toggle="collapse"
                                                        href={"#collapse" + order.user}
                                                        className="button-collapse collapsed"
                                                        aria-expanded="false"
                                                        aria-controls={"#collapse" + order.user}>&lt;
                                                    </th>
                                                </tr>
                                                </thead>
                                                <tbody className="collapse" id={"collapse" + order.user}>

                                                <tr >
                                                    <th width={"5%"}>1.</th>
                                                    <th width={"55%"} className="titleTh">
                                                    <span
                                                        className="header">
                                                    {order.item_id.name}
                                                    </span>
                                                        <br/>
                                                        <span className="description">
                                                    {order.item_id.description}
                                                    </span>
                                                    </th>
                                                    <th width={"30%"}>
                                                        {this.state.data.user.user_id === order.user ?
                                                            <button className="counter"
                                                                    onClick={() => this.counter("down", order.user)}>-
                                                            </button> : null
                                                        }

                                                        {order.quantity}
                                                        {this.state.data.user.user_id === order.user ?
                                                            <button className="counter"
                                                                    onClick={() => this.counter("up", order.user)}>+
                                                            </button> : null
                                                        }
                                                    </th>
                                                    <th width={"10%"}>{parseFloat(order.item_total).toFixed(2)}$</th>
                                                    <th></th>
                                                </tr>

                                                </tbody>
                                            </table>


                                        </div>
                                    )}


                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="row order-right-block">
                                    <p className="header">Payment Method</p>
                                    <div className="radio text-left">
                                        <label>
                                            <input type="radio" name="pay_method" value={1}/> Card <span><img style={{height: 20}}
                                                                                  src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjY0cHgiIGhlaWdodD0iNjRweCIgdmlld0JveD0iMCAwIDU0OC4xNzYgNTQ4LjE3NiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTQ4LjE3NiA1NDguMTc2OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxnPgoJPGc+CgkJPHBhdGggZD0iTTUzNC43NTQsNjguMjM4Yy04Ljk0NS04Ljk0NS0xOS42OTgtMTMuNDE3LTMyLjI1OC0xMy40MTdINDUuNjgxYy0xMi41NjIsMC0yMy4zMTMsNC40NzEtMzIuMjY0LDEzLjQxNyAgICBDNC40NzEsNzcuMTg1LDAsODcuOTM2LDAsMTAwLjQ5OXYzNDcuMTczYzAsMTIuNTY2LDQuNDcxLDIzLjMxOCwxMy40MTcsMzIuMjY0YzguOTUxLDguOTQ2LDE5LjcwMiwxMy40MTksMzIuMjY0LDEzLjQxOWg0NTYuODE1ICAgIGMxMi41NiwwLDIzLjMxMi00LjQ3MywzMi4yNTgtMTMuNDE5YzguOTQ1LTguOTQ1LDEzLjQyMi0xOS42OTcsMTMuNDIyLTMyLjI2NFYxMDAuNDk5ICAgIEM1NDguMTc2LDg3LjkzNiw1NDMuNjk5LDc3LjE4NSw1MzQuNzU0LDY4LjIzOHogTTUxMS42MjcsNDQ3LjY3OWMwLDIuNDc4LTAuOTAzLDQuNjEzLTIuNzExLDYuNDI3ICAgIGMtMS44MDcsMS44LTMuOTQ5LDIuNzAzLTYuNDIsMi43MDNINDUuNjgxYy0yLjQ3MywwLTQuNjE1LTAuOTAzLTYuNDIzLTIuNzFjLTEuODA3LTEuODEzLTIuNzEyLTMuOTQ5LTIuNzEyLTYuNDI3VjI3NC4wODggICAgaDQ3NS4wODJWNDQ3LjY3OXogTTUxMS42MjcsMTY0LjQ0OUgzNi41NDV2LTYzLjk1NGMwLTIuNDc0LDAuOTAyLTQuNjExLDIuNzEyLTYuNDIzYzEuODA5LTEuODAzLDMuOTUxLTIuNzA4LDYuNDIzLTIuNzA4aDQ1Ni44MTUgICAgYzIuNDcxLDAsNC42MTMsMC45MDEsNi40MiwyLjcwOGMxLjgwOCwxLjgxMiwyLjcxMSwzLjk0OSwyLjcxMSw2LjQyM1YxNjQuNDQ5TDUxMS42MjcsMTY0LjQ0OXoiIGZpbGw9IiMwMDAwMDAiLz4KCQk8cmVjdCB4PSI3My4wOTIiIHk9IjM4My43MTkiIHdpZHRoPSI3My4wODkiIGhlaWdodD0iMzYuNTQ4IiBmaWxsPSIjMDAwMDAwIi8+CgkJPHJlY3QgeD0iMTgyLjcyOCIgeT0iMzgzLjcxOSIgd2lkdGg9IjEwOS42MzQiIGhlaWdodD0iMzYuNTQ4IiBmaWxsPSIjMDAwMDAwIi8+Cgk8L2c+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPC9zdmc+Cg=="/></span>
                                        </label>
                                    </div>

                                    <div className="radio text-left">
                                        <label>
                                            <input type="radio" name="pay_method" value={2}/> Pay With Cash <span><img style={{height: 20}}
                                                                                           src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMS4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDMzNC44NzcgMzM0Ljg3NyIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMzM0Ljg3NyAzMzQuODc3OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjY0cHgiIGhlaWdodD0iNjRweCI+CjxnPgoJPHBhdGggZD0iTTMzMy4xOTYsMTU1Ljk5OWgtMTYuMDY3VjgyLjA5YzAtMTcuNzE5LTE0LjQxNS0zMi4xMzQtMzIuMTM0LTMyLjEzNGgtMjEuNzYxTDI0MC45NjUsOS45MTcgICBDMjM3LjU3MSwzLjc5OCwyMzEuMTEyLDAsMjI0LjEwNywwYy0zLjI2NSwwLTYuNTA0LDAuODQyLTkuMzY0LDIuNDI5bC04NS40NjQsNDcuNTI2SDMzLjgxNSAgIGMtMTcuNzE5LDAtMzIuMTM0LDE0LjQxNS0zMi4xMzQsMzIuMTM0djIyMC42NTNjMCwxNy43MTksMTQuNDE1LDMyLjEzNCwzMi4xMzQsMzIuMTM0aDI1MS4xOCAgIGMxNy43MTksMCwzMi4xMzQtMTQuNDE1LDMyLjEzNC0zMi4xMzR2LTY0LjgwMmgxNi4wNjdWMTU1Ljk5OXogTTI4NC45OTUsNjIuODA5YzkuODk3LDAsMTcuOTgyLDcuNTE5LDE5LjA2OCwxNy4xNGgtMjQuMTUyICAgbC05LjUyNS0xNy4xNEgyODQuOTk1eiBNMjIwLjk5NiwxMy42NjNjMy4wMTQtMS42OSw3LjA3LTAuNTA4LDguNzM0LDIuNDk0bDM1LjQ3Niw2My43ODZIMTAxLjc5OEwyMjAuOTk2LDEzLjY2M3ogICAgTTMwNC4yNzUsMzAyLjc0MmMwLDEwLjYzLTguNjUxLDE5LjI4MS0xOS4yODEsMTkuMjgxSDMzLjgxNWMtMTAuNjMsMC0xOS4yODEtOC42NTEtMTkuMjgxLTE5LjI4MVY4Mi4wOSAgIGMwLTEwLjYzLDguNjUxLTE5LjI4MSwxOS4yODEtMTkuMjgxaDcyLjM1M0w3NS4zNDUsNzkuOTVIMzcuODMyYy0zLjU1NCwwLTYuNDI3LDIuODc5LTYuNDI3LDYuNDI3czIuODczLDYuNDI3LDYuNDI3LDYuNDI3aDE0LjM5NiAgIGgyMzQuODNoMTcuMjE3djYzLjIwMWgtNDYuOTk5Yy0yMS44MjYsMC0zOS41ODksMTcuNzY0LTM5LjU4OSwzOS41ODl2Mi43NjRjMCwyMS44MjYsMTcuNzY0LDM5LjU4OSwzOS41ODksMzkuNTg5aDQ2Ljk5OVYzMDIuNzQyeiAgICBNMzIwLjM0MiwyMjUuMDg3aC0zLjIxM2gtNTkuODUzYy0xNC43NDMsMC0yNi43MzYtMTEuOTkyLTI2LjczNi0yNi43MzZ2LTIuNzY0YzAtMTQuNzQzLDExLjk5Mi0yNi43MzYsMjYuNzM2LTI2LjczNmg1OS44NTMgICBoMy4yMTNWMjI1LjA4N3ogTTI3Ni45NjEsMTk3LjQ5N2MwLDcuODQxLTYuMzUsMTQuMTktMTQuMTksMTQuMTljLTcuODQxLDAtMTQuMTktNi4zNS0xNC4xOS0xNC4xOXM2LjM1LTE0LjE5LDE0LjE5LTE0LjE5ICAgQzI3MC42MTIsMTgzLjMwNiwyNzYuOTYxLDE4OS42NjIsMjc2Ljk2MSwxOTcuNDk3eiIgZmlsbD0iIzAwMDAwMCIvPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo="/></span>
                                        </label>
                                    </div>
                                    <button className="add-card">Add Card</button>
                                    <hr/>
                                    <p>
                                        <span
                                            className="total-header">
                                                    Total:
                                                    </span>
                                        <span className="total-bill">
                                                    {parseFloat(this.state.data.order_bill).toFixed(2)}$
                                                    </span>
                                    </p>
                                    <hr/>
                                    <button className="pay-btn">Pay</button>
                                </div>
                            </div>
                        </div>

                        :
                        this.state.error === true ?
                            <h3>{this.state.errorMsg}</h3>
                            :
                            <h3>Loading</h3>


                    }

                </div>
            </div>
        )
    }
}


export default class Header extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <Order_details {...this.props}/>
                <Page_footercoming/>
            </div>
        );
    }
};
