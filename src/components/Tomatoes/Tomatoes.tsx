import * as React from 'react'
import TomatoAction from "./TomatoAction";
import {connect} from 'react-redux'
import './Tomatoes.scss'
import {addTomato,initTomatoes} from "../../redux/actions/tomatoes";
import axios from '../../config/axios'

interface ITomatoesProps {
  addTomato: (payload:any) => any;
  tomatoes: any[]

}


class Tomatoes extends React.Component<ITomatoesProps> {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.getTomatoes()
  }

  get unfinishedTomato() {
    // console.log(this.props.tomatoes)
    return this.props.tomatoes.filter(t => !t.description && !t.ender_at)[0]
  }

  getTomatoes = async ()=> {
    try{
      const response = await axios.get('tomatoes')
      console.log(response.data.resource)
    }catch (e) {
      throw new Error(e)
    }
  }

  startTomato = async ()=> {
    try{
      const response = await axios.post('tomatoes',{duration:1500000})
      this.props.addTomato(response.data.resource)
    }catch (e) {
      throw new Error(e)
    }
  }

  public render() {
    return (
      <div className="Tomatoes" id="Tomatoes">
        <TomatoAction startTomato={this.startTomato}
                      unfinishedTomato={this.unfinishedTomato}

        />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  tomatoes: state.tomatoes,
  ...ownProps
})

const mapDispatchToProps = {
  addTomato,
  initTomatoes
}

export default connect(mapStateToProps,mapDispatchToProps)(Tomatoes)