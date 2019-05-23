import React from 'react';
import { connect } from 'react-redux';
import * as noteboxActions from '../../redux/actions/Notebox';
import styled from 'styled-components';
import PropTypes from 'prop-types';

class Notebox extends React.Component {
    state = {
      inputValue: '',
      inputValueFiltered: '',
    }

    componentDidMount() {
        this.props.getNotebox();
        this.props.getExchanges();
    }

    handleChangeInput = e => {
        const { inputValue } = this.state
        const { infoData, exchangesData } = this.props
        const value = e.currentTarget.value
        const regex = /\{\{(.*?)\}\}/g

        let filteredInput = inputValue.replace(regex, function(matched){
          const trimmedMatchedTable = matched.slice(2,-2).trim().toUpperCase().split('/')
          const coinProperty = trimmedMatchedTable[0]
          const coin = trimmedMatchedTable[1]
          let coinName, coinValue
          infoData.map(item => {
            if(item.symbol === coin) {
              coinName = item.name
            }
            return coinName
          })

          switch(coinProperty) {
            case 'PRICE':
              exchangesData.map(item => {
                if(item.base_currency_name === coinName) {
                  coinValue = item.quotes.USD.price
                }
                return coinValue
              })
              return coinValue;
            case 'NAME':
              return coinName;
            case 'SYMBOL':
              return coin;
            default:
              return
          }
        })
        this.setState({
          inputValue: value,
          inputValueFiltered: filteredInput,
        })
    }

    render() {
        const { inputValue, inputValueFiltered } = this.state
        const { isLoading, isError } = this.props
        return(
            <NoteboxWrapper>
                {!isLoading && !isError &&
                  <AreaBox value={inputValue} placeholder="Start writting" onChange={this.handleChangeInput} />
                }
                <ViewBox>{inputValueFiltered}</ViewBox>
            </NoteboxWrapper>
        )
    }
}

const mapStateToProps = (state) => {
    return {
      ...state
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
      getNotebox: () => dispatch(noteboxActions.getNotebox()),
      getExchanges: () => dispatch(noteboxActions.getExchanges()),
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(Notebox);

Notebox.propTypes = {
  getNotebox: PropTypes.func,
  getExchanges: PropTypes.func,
  isLoading: PropTypes.bool,
  isError: PropTypes.bool,
  infoData: PropTypes.array,
  exchangesData: PropTypes.array,
}

const ViewBox = styled.div`
    margin: 0  10px;
    flex: 1;
    border: 1px solid black;
    padding: 8px;
    border-radius: 6px;
    font-size: 20px;
    max-width: 700px;
`

const AreaBox = styled.textarea`
    min-height: 150px;
    max-height: 350px;
    min-width: 40%;
    max-width: 50%;
    margin: 0 auto;
    padding: 8px;
    border: 1px solid silver;
    border-radius: 6px;
    font-size: 20px;
`

const NoteboxWrapper = styled.div`
    margin: 10px auto;
    padding: 8px;
    height: 400px;
    display: flex;
    max-width: 1480px;
`