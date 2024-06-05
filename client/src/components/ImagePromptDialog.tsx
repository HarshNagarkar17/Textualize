import LoadingBtn from "./LoadingBtn";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";

interface Props {
  open: boolean;
  onOpenChange: any;
  prompt: string;
  setPrompt: any;
  handleImageGeneration: any;
}
const ImagePromptDialog = ({
  open,
  onOpenChange,
  setPrompt,
  prompt,
  handleImageGeneration,
}: Props) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Generate Image for your blog using AI</DialogTitle>
          <DialogDescription className="image-dialog-desc">
            <form onSubmit={handleImageGeneration}>
              <Input
                name="prompt"
                className="w-10/12"
                type="text"
                placeholder="Enter your prompt..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                autoFocus
              />
              <LoadingBtn loading={false} />
            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ImagePromptDialog;
