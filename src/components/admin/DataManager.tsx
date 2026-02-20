import { useRef, useState } from "react";
import { useCMSExport, useCMSImport, useCMSTemples, useCMSTours } from "@/hooks/useCMSData";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Upload, Database, Map, Route, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const DataManager = () => {
  const { exportData } = useCMSExport();
  const { importData } = useCMSImport();
  const { temples, resetToDefault: resetTemples } = useCMSTemples();
  const { tours, resetToDefault: resetTours } = useCMSTours();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isImporting, setIsImporting] = useState(false);
  const { toast } = useToast();

  const handleExport = () => {
    exportData();
    toast({
      title: "Export Successful",
      description: "Your data has been downloaded as a JSON file.",
    });
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsImporting(true);
    const result = await importData(file);
    setIsImporting(false);

    toast({
      title: result.success ? "Import Successful" : "Import Failed",
      description: result.message,
      variant: result.success ? "default" : "destructive",
    });

    // Reset the input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleResetAll = () => {
    resetTemples();
    resetTours();
    toast({
      title: "All Data Reset",
      description: "All temples and tours have been reset to defaults.",
    });
  };

  const getStorageSize = () => {
    let total = 0;
    for (const key of ['cms_temples', 'cms_tours', 'cms_seo']) {
      const item = localStorage.getItem(key);
      if (item) {
        total += new Blob([item]).size;
      }
    }
    return (total / 1024).toFixed(2);
  };

  return (
    <div className="space-y-6">
      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Map className="w-4 h-4 text-primary" />
              Temples
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{temples.length}</div>
            <p className="text-xs text-muted-foreground">Total temples in database</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Route className="w-4 h-4 text-primary" />
              Tours
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{tours.length}</div>
            <p className="text-xs text-muted-foreground">Total tour packages</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Database className="w-4 h-4 text-primary" />
              Storage Used
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{getStorageSize()} KB</div>
            <p className="text-xs text-muted-foreground">Local storage usage</p>
          </CardContent>
        </Card>
      </div>

      {/* Export/Import */}
      <Card>
        <CardHeader>
          <CardTitle>Data Backup & Restore</CardTitle>
          <CardDescription>
            Export your data to a JSON file for backup, or import from a previous backup.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <Button onClick={handleExport} className="flex-1">
              <Download className="w-4 h-4 mr-2" />
              Export All Data
            </Button>
            
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              onChange={handleFileChange}
              className="hidden"
            />
            
            <Button 
              variant="outline" 
              onClick={handleImportClick} 
              disabled={isImporting}
              className="flex-1"
            >
              <Upload className="w-4 h-4 mr-2" />
              {isImporting ? "Importing..." : "Import Data"}
            </Button>
          </div>

          <div className="bg-muted/50 rounded-lg p-4 text-sm text-muted-foreground">
            <p className="font-medium mb-2">Important Notes:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Data is stored in your browser's local storage</li>
              <li>Clearing browser data will remove all CMS changes</li>
              <li>Regular exports are recommended for backup</li>
              <li>Import will replace all existing data</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-destructive/50">
        <CardHeader>
          <CardTitle className="text-destructive flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            Danger Zone
          </CardTitle>
          <CardDescription>
            Irreversible actions that will reset your data.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">
                Reset All Data to Defaults
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Reset All Data?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will delete all your custom temples and tours and restore the original default data. 
                  This action cannot be undone. Consider exporting your data first.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleResetAll} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                  Reset All Data
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardContent>
      </Card>
    </div>
  );
};

export default DataManager;
