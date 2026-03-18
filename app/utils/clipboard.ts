export function copyToClipboard(toCopy: string, message: string = "Copied to clipboard") {
  if (!import.meta.client) return
  const toast = useToast()
  void navigator.clipboard.writeText(toCopy).then(() => {
    toast.add({ title: message, color: "success", icon: "lucide:check-circle" })
  })
}
