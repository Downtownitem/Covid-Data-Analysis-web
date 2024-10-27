import { Dock, DockIcon } from "../../@/components/magicui/dock";

export default function MyDock() {
  return (
    <>
      <div className="relative">
        <Dock direction="middle">
          <DockIcon>
            <img src="" alt="" />
          </DockIcon>
          <DockIcon>
            <img src="" alt="" />
          </DockIcon>
          <DockIcon>
            <img src="" alt="" />
          </DockIcon>
          <DockIcon>
            <img src="" alt="" />
          </DockIcon>
        </Dock>
      </div>
    </>
  );
}
