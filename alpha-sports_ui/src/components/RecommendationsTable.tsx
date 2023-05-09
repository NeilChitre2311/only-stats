import React from 'react'
import { useState } from 'react'
import { Button, Table } from 'semantic-ui-react'
import PlayerComparison from './PlayerComparison'
import { getComparisonApi } from '../api/PlayerRecApi'


const RecommendationsTable = (props: {queryPlayerId: number, recPlayers: any}) => {
    
    const [showComparison, setShowComparison] = React.useState(false);
    const [data, setData] = useState([])
    
    const onCompareClick = async (player: any) => {
        console.log('Clicked on: ', player)
        console.log('To compare with', props.queryPlayerId)
        // API Call to get comparison data
        const response: any = await getComparisonApi(props.queryPlayerId, player.id)
        setData(response.data)
        setShowComparison(true)
    }
    const handleCloseComparison = () => {
        setShowComparison(false);
    };

    const tableRows = props.recPlayers && props.recPlayers.map((player: any) => (
        <Table.Row>
            <Table.Cell>{player.name}</Table.Cell>
            <Table.Cell>{player.position}</Table.Cell>
            <Table.Cell>{player.age}</Table.Cell>
            <Table.Cell>{player.team}</Table.Cell>
            <Table.Cell>{player.league}</Table.Cell>
            <Table.Cell>{player.similarity}</Table.Cell>
            <Table.Cell><Button onClick={() => onCompareClick(player)} inverted>Compare</Button></Table.Cell>
        </Table.Row>
    ))

    return (
        <div>
            <Table celled inverted style={{marginTop: '5em'}}>
            <Table.Header>
            <Table.Row>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Position</Table.HeaderCell>
                <Table.HeaderCell>Age</Table.HeaderCell>
                <Table.HeaderCell>Team</Table.HeaderCell>
                <Table.HeaderCell>League</Table.HeaderCell>
                <Table.HeaderCell>Similarity %</Table.HeaderCell>
                <Table.HeaderCell></Table.HeaderCell>
            </Table.Row>
            </Table.Header>
            <Table.Body>
            {tableRows}
            </Table.Body>
            <Table.Footer>
                <Table.Row>
                    <Table.HeaderCell>{props.recPlayers.length} Players</Table.HeaderCell>
                    <Table.HeaderCell colSpan="6">Recommendations</Table.HeaderCell>
                </Table.Row>
            </Table.Footer>
        </Table>
        {showComparison && <PlayerComparison data={data} open={showComparison} handleClose={handleCloseComparison} />}
        </div>
    )
}

export default RecommendationsTable