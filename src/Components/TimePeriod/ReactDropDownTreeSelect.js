import React from 'react'
//Imports for react dropDwon tree select
import DropdownTreeSelect from 'react-dropdown-tree-select'
import 'react-dropdown-tree-select/dist/styles.css'

function ReactDropDownTreeSelect() {
    const data =  {
        label: 'search me',
        value: 'searchme',
        children: [
          {
            label: 'search me too',
            value: 'searchmetoo',
            children: [
              {
                label: 'No one can get me',
                value: 'anonymous',
              },
            ],
          },
        ],
      }

    

    const onChange = (currentNode, selectedNodes) => {
        console.log('onChange::', currentNode, selectedNodes)
      }
      const onAction = (node, action) => {
        console.log('onAction::', action, node)
      }
      const onNodeToggle = currentNode => {
        console.log('onNodeToggle::', currentNode)
      }
    return (
        <div>
             <DropdownTreeSelect 
               data={data} 
               onChange={onChange} 
               onAction={onAction} 
               onNodeToggle={onNodeToggle}
               width={500}
             />
        </div>
    )
}

export default ReactDropDownTreeSelect
