import Workspace from "./components/workspace";
import { useContext } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Plus } from "@phosphor-icons/react";
import User from "../../shared/components/user";
import { WorkspaceContext } from ".";
import { useCreateWorkspace, useGetWorkspaces } from "./api/useWorkspaceApi";

export default function Sidebar() {
  const { user } = useAuth();
  const { selectedworkspace, setselectedWorkspace } =
    useContext(WorkspaceContext);

  const { mutate: createWorkspace } = useCreateWorkspace({
    onSuccess: (data) => {
      if (data.success) {
        setselectedWorkspace({
          id: data.id,
          title: "Untitled Workspace",
        });
        refetchWorkspaces();
      } else if (data.warning) {
        console.log("warning", data.warning);
      } else {
        console.log("error", data.error);
      }
    },
    onError: (data) => {
      console.log(data);
    },
  });

  const {
    data,
    isLoading,
    refetch: refetchWorkspaces,
  } = useGetWorkspaces(user.email);

  return (
    <div className="no-scrollbar sticky z-50 top-2">
      <div className="flex justify-between border-b-2 p-4 w-full">
        <a className="ml-1 font-Satoshi-Black flex items-center gap-2" href="/">
          Testopia
        </a>
        <User />
      </div>
      <div className="p-4">
        <div className="flex justify-between items-center relative mb-5 pt-5">
          <p className="ml-1 font-Satoshi-Black">Workspaces</p>
          <button
            className="bg-white p-1.5 border-[1px] rounded-full"
            onClick={() => {
              createWorkspace(user.email);
            }}
          >
            <Plus size={14} weight="bold" />
          </button>
        </div>
        {isLoading ? (
          <h1>loading</h1>
        ) : (
          data.workspaces.map((workspace, i) => {
            return (
              <Workspace
                key={i}
                i={i}
                id={workspace._id}
                refetchWorkspaces={refetchWorkspaces}
                title={workspace.title}
                selectedworkspace={selectedworkspace}
                setselectedWorkspace={setselectedWorkspace}
              />
            );
          })
        )}
      </div>
    </div>
  );
}
