"use client";
import { ChangeEventHandler, useCallback, useEffect, useState } from "react";
import { ListExecutionsResult } from "@defer/client/typings/backend";
import Image from "next/image";
import ReactFlow, {
  useNodesState,
  useEdgesState,
  Controls,
  Node,
  Edge,
  Position,
  MarkerType,
  useReactFlow,
  ReactFlowProvider,
  ReactFlowInstance,
} from "reactflow";

import { Action, Step, broofa } from "@/utils/workflow";
import { listStepsStatus, runWorkflow } from "./actions/actions";

import logo from "./logo.png";
import "reactflow/dist/style.css";

const START_NODE: Node<any, string | undefined> = {
  id: "trigger",
  data: { label: "User added" },
  style: { border: "3px solid #000" },
  position: { x: 0, y: 100 },
  sourcePosition: Position.Right,
};
const START_EDGE: Edge<any> = {
  id: "first-edge",
  source: "trigger",
  target: "node-0",
  type: "smoothstep",

  markerEnd: {
    type: MarkerType.ArrowClosed,
  },
};
const END_NODE: (
  len: number,
  processedCount?: number
) => Node<any, string | undefined> = (len, processedCount) => ({
  id: "end",
  style: { border: "3px solid #000" },
  data: {
    label: processedCount
      ? `Workflow end (processed ${processedCount} users)`
      : "Workflow end",
  },
  position: { x: (len + 1) * 200, y: 100 },
});
const END_EDGE: Edge<any> = {
  id: "first-edge",
  source: "trigger",

  target: "end",
  type: "smoothstep",
  markerEnd: {
    type: MarkerType.ArrowClosed,
  },
};

function stepToLabel(
  action: Action,
  args: any[],
  executions?: ListExecutionsResult
) {
  if (action === "sendNotification") {
    return executions
      ? `Send notification (${executions.data.length} users processed)`
      : `Send notification`;
  }
  if (action === "wait") {
    return executions
      ? `Wait ${args[0]} seconds (${executions.data.length} users processed)`
      : `Wait ${args[0]} seconds`;
  }
}

function Main() {
  const [reactFlowInstance, setReactFlowInstance] =
    useState<ReactFlowInstance<any, any>>();
  const [nodes, setNodes] = useNodesState([START_NODE, END_NODE(1)]);
  const [edges, setEdges] = useEdgesState([END_EDGE]);

  const [steps, updateSteps] = useState<Step[]>([]);
  const [workflowID, setWorkflowId] = useState<string>();
  const [stepAction, updateStepAction] = useState<
    "wait-1" | "wait-3" | "wait-5" | "sendNotification"
  >("wait-1");

  const addStep = useCallback(() => {
    let newStep: Step | undefined = undefined;
    switch (stepAction) {
      case "sendNotification":
        newStep = {
          action: "sendNotification",
          args: [],
        };
        break;
      case "wait-1":
        newStep = {
          action: "wait",
          args: [1],
        };
        break;
      case "wait-3":
        newStep = {
          action: "wait",
          args: [3],
        };
        break;
      case "wait-5":
        newStep = {
          action: "wait",
          args: [5],
        };
        break;

      default:
        break;
    }
    if (newStep) {
      const s = [...steps, newStep];
      updateSteps(s);
      setNodes([
        START_NODE,
        ...s.map(({ action, args }, idx) => ({
          id: `node-${idx}`,
          data: { label: stepToLabel(action, args) },
          position: { x: 200 * (idx + 1), y: 100 },
        })),
        END_NODE(steps.length + 1),
      ]);
      setEdges([
        START_EDGE,
        ...s.map(({}, idx) => ({
          id: `target-${idx}`,
          source: `node-${idx}`,
          target: idx == s.length - 1 ? "end" : `node-${idx + 1}`,
          type: "smoothstep",
          // animated: true,
          markerEnd: {
            type: MarkerType.ArrowClosed,
          },
        })),
      ]);
    }
  }, [steps, stepAction]);

  const setStepAction: ChangeEventHandler<HTMLSelectElement> = useCallback(
    (e) => {
      updateStepAction(e.currentTarget.value as any);
    },
    [updateStepAction]
  );

  const run = useCallback(async () => {
    const wID = broofa();
    setWorkflowId(wID);
    await runWorkflow(wID, steps);
  }, [steps]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (reactFlowInstance) {
        reactFlowInstance.fitView();
      }
      // leverage Server Actions to regurarly refresh the steps statuses
      if (workflowID) {
        listStepsStatus(workflowID!, steps).then((data) => {
          setNodes([
            START_NODE,
            ...steps.map(({ action, args }, idx) => ({
              id: `node-${idx}`,
              data: { label: stepToLabel(action, args, data[idx]) },
              position: { x: 200 * (idx + 1), y: 100 },
            })),
            END_NODE(steps.length + 1, data[data.length - 1].data.length),
          ]);
          const workflowFinished = data[data.length - 1].data.length === 1000;
          if (workflowFinished) {
            setWorkflowId(undefined);
          }
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  });

  const resetWorkflow = useCallback(() => {
    updateSteps([]);
    setNodes([START_NODE, END_NODE(1)]);
    setEdges([END_EDGE]);
  }, []);

  return (
    <div className="flex-1 w-full flex flex-col gap-6 items-center">
      <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
        <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
          <Image src={logo} alt={"Defer"} className="flex-1 max-w-24" />
          <a
            className="py-2 px-3 flex rounded-md no-underline hover:bg-btn-background-hover border"
            href="https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fdefer-run%2Fdefer.demo%2Ftree%2Fmaster%2Fnextjs%2Fresend-template%2F&project-name=nextjs-with-defer-resend&repository-name=nextjs-with-defer-resend&demo-title=nextjs-with-defer-resend&demo-description=Schedule%20or%20offload%20the%20sending%20of%20rich%20emails%20with%20Resend.&demo-url=https%3A%2F%2Fdemo-nextjs-with-defer-resend.vercel.app%2F&external-id=https%3A%2F%2Fgithub.com%2Fdefer-run%2Fdefer.demo%2Ftree%2Fmaster%2Fnextjs%2Fresend-template%2F&demo-image=https%3A%2F%2Fraw.githubusercontent.com%2Fdefer-run%2Fdefer.demo%2Fmaster%2Fnextjs%2Fresend-template%2Fapp%2Fog_image.png&integration-ids="
            target="_blank"
            rel="noreferrer"
          >
            <svg
              aria-label="Vercel logomark"
              role="img"
              viewBox="0 0 74 64"
              className="h-4 w-4 mr-2"
            >
              <path
                d="M37.5896 0.25L74.5396 64.25H0.639648L37.5896 0.25Z"
                fill="currentColor"
              ></path>
            </svg>
            Deploy to Vercel
          </a>
        </div>
      </nav>

      <div className="flex flew-row gap-6 justify-start">
        <div className="flex">
          <select onChange={setStepAction}>
            <option value="wait-1">Wait 1 sec</option>
            <option value="wait-3">Wait 3 secs</option>
            <option value="wait-5">Wait 5 secs</option>
            <option value="sendNotification">Send a notification</option>
          </select>
          <button
            className={`ml-3 py-1 px-2 bg-black text-white flex rounded-md no-underline hover:bg-gray-800 border ${
              !!workflowID ? "cursor-not-allowed bg-gray-800" : ""
            }`}
            disabled={!!workflowID}
            onClick={addStep}
          >
            Add step
          </button>
        </div>
        <div className="flex justify-end">
          <button
            className={`py-1 px-2 bg-black text-white flex rounded-md no-underline hover:bg-gray-800 border  ${
              !!workflowID || steps.length === 0
                ? "cursor-not-allowed bg-gray-800"
                : ""
            }`}
            onClick={run}
            disabled={!!workflowID || steps.length === 0}
          >
            {workflowID
              ? "Workflow running ..."
              : "Simulate workflow for 1,000 users"}
          </button>
        </div>
        <div className="flex justify-end">
          <button
            className={`py-1 px-2 bg-white text-black flex rounded-md no-underline hover:bg-gray-100 border  ${
              !!workflowID || steps.length === 0
                ? "cursor-not-allowed bg-gray-100"
                : ""
            }`}
            onClick={resetWorkflow}
            disabled={!!workflowID || steps.length === 0}
          >
            {"Reset Workflow"}
          </button>
        </div>
      </div>

      <div className="h-[500px] w-full">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={() => {}}
          onEdgesChange={() => {}}
          snapToGrid={true}
          snapGrid={[20, 20]}
          fitView
          attributionPosition="bottom-left"
          nodesDraggable={false}
          nodesFocusable={false}
          onInit={(instance) => setReactFlowInstance(instance)}
        >
          <Controls />
        </ReactFlow>
      </div>

      <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs">
        <p>
          Explore the{" "}
          <a
            href="https://www.defer.run/docs/introduction"
            target="_blank"
            className="font-bold hover:underline"
            rel="noreferrer"
          >
            Defer documentation
          </a>
        </p>
      </footer>
    </div>
  );
}

export default function Index() {
  return (
    <ReactFlowProvider>
      <Main />
    </ReactFlowProvider>
  );
}
