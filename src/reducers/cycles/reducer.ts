import { produce } from 'immer';

import { ActionTypes } from "./actions";

interface CyclesState {
    cycles: Cycle[];
    activeCycleId: string | null
}

export interface Cycle {
    id: string;
    task: string;
    minutesAmount: number;
    startDate: Date;
    interruptedDate?: Date;
    finishedDate?: Date;
}


export function cyclesReducer(state: CyclesState, action: any) {
    switch (action.type) {
        case ActionTypes.ADD_NEW_CYCLE:
            return produce(state, (draft) => {
                draft.cycles.push(action.payload.newCycle)
                draft.activeCycleId = action.payload.newCycle.id
            })
        case ActionTypes.INTERRUPT_CURRENT_CYCLE: {
            // return {
            //     ...state,
            //     cycles: state.cycles.map(cycle => {
            //         if (cycle.id === state.activeCycleId) {
            //             return { ...cycle, interruptedDate: new Date() }
            //         } else {
            //             return cycle
            //         }
            //     }),
            //     activeCycleId: null,
            // }

            const currentCycleIdIndex = state.cycles.findIndex(cycle => {
                return cycle.id === state.activeCycleId
            })

            if (currentCycleIdIndex < 0) {
                return state
            }

            return produce(state, (draft) => {
                draft.activeCycleId = null;
                draft.cycles[currentCycleIdIndex].interruptedDate = new Date()
            })
        }
        case ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED:{
            // return {
            //     ...state,
            //     cycles: state.cycles.map(cycle => {
            //         if (cycle.id === state.activeCycleId) {
            //         } else {
            //             return cycle
            //         }
            //     }),
            //     activeCycleId: null,
            // }
            const currentCycleIdIndex = state.cycles.findIndex(cycle => {
                return cycle.id === state.activeCycleId
            })

            if (currentCycleIdIndex < 0) {
                return state
            }

            return produce(state, (draft) => {
                draft.activeCycleId = null;
                draft.cycles[currentCycleIdIndex].finishedDate = new Date()
            })
        }
        default: return state;
    }

}