import React from "react";
import { ICondition } from "../shared/interfaces/ICondition";
import { FieldOptions } from "../shared/enums/FieldOptions";
import { DataType } from "../shared/enums/DataType";
import Flex from "./shared/Flex";
import Condition from "./Condition";
import Button from "./shared/Button";
import { generateScript } from "../shared/utils/sqlGenerator";

interface IState {
    conditions: ICondition[];
    sqlStatement: string;
}

class App extends React.Component<{}, IState> {
    state = {
        conditions: [{
            LeftAttribute: {
                AttributeName: FieldOptions.Domain,
                DataTypeName: DataType.String
            },
            RightAttribute: {
                Value: ""
            },
            FunctionName: "equals"
        }],
        sqlStatement: ""
    };

    updateCondition = (index: number, condition: ICondition) => {
        const conditions: ICondition[] = [...this.state.conditions];
        conditions[index] = condition;
        this.setState({ conditions });
    }

    removeCondition = (index: number) => {
        let conditions: ICondition[] = [...this.state.conditions];
        if (conditions.length > 1) {
            conditions.splice(index, 1);
        } else {
            conditions = [this.getEmptyCondition()];
        }
        this.setState({ conditions });
    }

    handleUpdateCondition = (index: number) => (condition: ICondition) => this.updateCondition(index, condition);
    handleRemoveCondition = (index: number) => () => this.removeCondition(index);

    addCondition = () => {
        let conditions: ICondition[] = [...this.state.conditions];
        conditions.push(this.getEmptyCondition());
        this.setState({ conditions });
    }

    resetConditions = () => {
        let conditions: ICondition[] = [this.getEmptyCondition()];
        this.setState({ conditions });
    }

    generate = () => {
        const sqlStatement = generateScript(this.state.conditions);
        this.setState({sqlStatement});
    }

    private getEmptyCondition = () => {
        return {
            LeftAttribute: {
                AttributeName: FieldOptions.Domain,
                DataTypeName: DataType.String
            },
            RightAttribute: {
                Value: ""
            },
            FunctionName: "equals"
        };
    }

    render () {
        return (
          <Flex className="App" direction="column">
            <header className="App-header">
              <h2>
                Search for Sessions
              </h2>
            </header>
            <div className="conditions">
              {
                this.state.conditions.map((condition, index) => (
                  <Condition
                      key={`${index}-cond`}
                      condition={condition}
                      onConditionChange={this.handleUpdateCondition(index)}
                      onConditionRemove={this.handleRemoveCondition(index)}
                  />
                ))
              }
              <Button onClick={this.addCondition}>
                And
              </Button>
              <hr className="horizontal-divider qm-spacing-bottom-lg qm-spacing-top-lg" />
              <Flex alignItems="flex-start">
                  <Button onClick={this.generate}>
                      Search
                  </Button>
                  <Button onClick={this.resetConditions} disabled={true} className="qm-spacing-left-md">
                      Reset
                  </Button>
              </Flex>
              <Flex className="sql-statement qm-spacing-top-lg" alignItems="center" justifyContent="center">
                {
                  this.state.sqlStatement ? (
                      <span>{this.state.sqlStatement}</span>
                  ) : (
                      <p>Your generated SQL statement goes here:</p>
                  )
                }
              </Flex>
            </div>
          </Flex>
        );
    }
}

export default App;
