import React, { useState } from "react";
import {
  DollarSign,
  Download,
  Printer,
  Plus,
  Trash2,
  FileText,
  User,
  Building,
  Calendar,
  Mail,
  Phone,
  MapPin,
  Check,
  AlertCircle,
  CreditCard,
  Receipt,
  Tag,
  Percent,
  Copy,
  Calculator,
} from "lucide-react";

const InvoiceGenerator = () => {
  const [invoiceNumber, setInvoiceNumber] = useState(
    "INV-" + Date.now().toString().slice(-6)
  );
  const [invoiceDate, setInvoiceDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [dueDate, setDueDate] = useState("");
  const [fromInfo, setFromInfo] = useState({
    name: "Your Business Name",
    company: "Your Company",
    address: "123 Business St, City, State 12345",
    email: "contact@yourbusiness.com",
    phone: "(123) 456-7890",
  });
  const [toInfo, setToInfo] = useState({
    name: "Client Name",
    company: "Client Company",
    address: "456 Client Ave, City, State 67890",
    email: "contact@client.com",
    phone: "(987) 654-3210",
  });
  const [items, setItems] = useState([
    {
      id: 1,
      description: "Web Design Services",
      quantity: 1,
      price: 500,
      tax: 10,
    },
  ]);
  const [notes, setNotes] = useState("Thank you for your business!");
  const [paymentTerms, setPaymentTerms] = useState("Net 30");

  const addItem = () => {
    setItems([
      ...items,
      {
        id: items.length + 1,
        description: "New Service",
        quantity: 1,
        price: 0,
        tax: 10,
      },
    ]);
  };

  const removeItem = (id) => {
    if (items.length > 1) {
      setItems(items.filter((item) => item.id !== id));
    }
  };

  const updateItem = (id, field, value) => {
    setItems(
      items.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const calculateSubtotal = () => {
    return items.reduce((sum, item) => sum + item.quantity * item.price, 0);
  };

  const calculateTax = () => {
    return items.reduce(
      (sum, item) => sum + (item.quantity * item.price * item.tax) / 100,
      0
    );
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
  };

  const generateInvoiceHTML = () => {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Invoice ${invoiceNumber}</title>
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 40px; background: #f8fafc; }
          .invoice-container { max-width: 800px; margin: 0 auto; }
          .invoice { background: white; padding: 40px; border-radius: 20px; box-shadow: 0 20px 60px rgba(0,0,0,0.1); }
          .header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 40px; padding-bottom: 30px; border-bottom: 2px solid #e9ecef; }
          .invoice-title { font-size: 36px; font-weight: 800; color: #1a1a1a; margin: 0; }
          .invoice-details { text-align: right; }
          .info-row { display: flex; justify-content: space-between; margin-bottom: 40px; }
          .from-info, .to-info { flex: 1; }
          .section-title { font-size: 18px; font-weight: 600; color: #495057; margin-bottom: 15px; padding-bottom: 10px; border-bottom: 2px solid #4f46e5; }
          table { width: 100%; border-collapse: collapse; margin: 30px 0; }
          th { background: #4f46e5; color: white; padding: 15px; text-align: left; font-weight: 600; }
          td { padding: 15px; border-bottom: 1px solid #e9ecef; }
          tr:hover { background-color: #f8f9fa; }
          .totals { background: #f8f9fa; padding: 25px; border-radius: 15px; margin-top: 40px; }
          .total-row { display: flex; justify-content: space-between; margin: 10px 0; font-size: 18px; }
          .total-label { font-weight: 600; color: #495057; }
          .grand-total { font-size: 28px; font-weight: 800; color: #4f46e5; border-top: 2px solid #4f46e5; padding-top: 15px; margin-top: 15px; }
          .footer { margin-top: 60px; padding-top: 30px; border-top: 1px solid #e9ecef; text-align: center; color: #6c757d; font-size: 14px; }
          .notes { background: #e7f5ff; padding: 20px; border-radius: 10px; margin-top: 30px; }
        </style>
      </head>
      <body>
        <div class="invoice-container">
          <div class="invoice">
            <div class="header">
              <div>
                <h1 class="invoice-title">INVOICE</h1>
                <div style="color: #6c757d; margin-top: 5px;">Professional Invoice</div>
              </div>
              <div class="invoice-details">
                <div style="font-size: 24px; font-weight: 700; color: #4f46e5; margin-bottom: 5px;">${invoiceNumber}</div>
                <div><strong>Date:</strong> ${invoiceDate}</div>
                <div><strong>Due Date:</strong> ${
                  dueDate || "Upon receipt"
                }</div>
                <div><strong>Terms:</strong> ${paymentTerms}</div>
              </div>
            </div>

            <div class="info-row">
              <div class="from-info">
                <div class="section-title">From</div>
                <div style="font-weight: 600; color: #1a1a1a;">${
                  fromInfo.name
                }</div>
                ${fromInfo.company ? `<div>${fromInfo.company}</div>` : ""}
                ${fromInfo.address ? `<div>${fromInfo.address}</div>` : ""}
                ${fromInfo.email ? `<div>${fromInfo.email}</div>` : ""}
                ${fromInfo.phone ? `<div>${fromInfo.phone}</div>` : ""}
              </div>
              <div class="to-info">
                <div class="section-title">To</div>
                <div style="font-weight: 600; color: #1a1a1a;">${
                  toInfo.name
                }</div>
                ${toInfo.company ? `<div>${toInfo.company}</div>` : ""}
                ${toInfo.address ? `<div>${toInfo.address}</div>` : ""}
                ${toInfo.email ? `<div>${toInfo.email}</div>` : ""}
                ${toInfo.phone ? `<div>${toInfo.phone}</div>` : ""}
              </div>
            </div>

            <table>
              <thead>
                <tr>
                  <th style="border-radius: 10px 0 0 0;">Description</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Tax %</th>
                  <th style="border-radius: 0 10px 0 0;">Amount</th>
                </tr>
              </thead>
              <tbody>
                ${items
                  .map(
                    (item) => `
                  <tr>
                    <td>${item.description}</td>
                    <td>${item.quantity}</td>
                    <td>$${item.price.toFixed(2)}</td>
                    <td>${item.tax}%</td>
                    <td>$${(
                      item.quantity *
                      item.price *
                      (1 + item.tax / 100)
                    ).toFixed(2)}</td>
                  </tr>
                `
                  )
                  .join("")}
              </tbody>
            </table>

            <div class="totals">
              <div class="total-row">
                <span>Subtotal:</span>
                <span>$${calculateSubtotal().toFixed(2)}</span>
              </div>
              <div class="total-row">
                <span>Tax:</span>
                <span>$${calculateTax().toFixed(2)}</span>
              </div>
              <div class="total-row grand-total">
                <span>TOTAL:</span>
                <span>$${calculateTotal().toFixed(2)}</span>
              </div>
            </div>

            ${
              notes
                ? `
              <div class="notes">
                <div style="font-weight: 600; color: #4f46e5; margin-bottom: 10px;">Notes</div>
                <div>${notes}</div>
              </div>
            `
                : ""
            }

            <div class="footer">
              <div style="margin-bottom: 10px;">Thank you for your business!</div>
              <div>Please make payment by ${
                dueDate || "the specified due date"
              }</div>
              <div style="margin-top: 20px; color: #adb5bd;">This is a computer-generated invoice</div>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;
  };

  const handleDownloadPDF = () => {
    const printWindow = window.open("", "_blank");
    printWindow.document.write(generateInvoiceHTML());
    printWindow.document.close();
    printWindow.print();
  };

  const handleDownloadHTML = () => {
    const blob = new Blob([generateInvoiceHTML()], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `invoice-${invoiceNumber}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCopyInvoiceNumber = async () => {
    try {
      await navigator.clipboard.writeText(invoiceNumber);
      alert("✓ Invoice number copied!");
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const generateInvoiceNumber = () => {
    const newNumber = "INV-" + Date.now().toString().slice(-6);
    setInvoiceNumber(newNumber);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl">
            <Receipt className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-gray-900">
              Invoice Generator
            </h1>
            <p className="text-gray-600 text-lg mt-2">
              Create professional invoices with customizable templates,
              automatic calculations, and easy export
            </p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 mb-12">
        {/* Left Column - Invoice Settings */}
        <div className="lg:col-span-2 space-y-6">
          {/* Invoice Details Card */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 px-6 py-4 border-b border-purple-100">
              <h2 className="text-xl font-semibold text-gray-900">
                Invoice Details
              </h2>
            </div>

            <div className="p-6">
              <div className="space-y-6">
                {/* Invoice Header */}
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="relative w-full">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Invoice Number
                    </label>

                    <div className="relative">
                      <input
                        className="w-full p-3 pr-20 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                        value={invoiceNumber}
                        onChange={(e) => setInvoiceNumber(e.target.value)}
                      />

                      <button
                        onClick={generateInvoiceNumber}
                        className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium"
                      >
                        New
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        Invoice Date
                      </div>
                    </label>
                    <input
                      type="date"
                      className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      value={invoiceDate}
                      onChange={(e) => setInvoiceDate(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        Due Date
                      </div>
                    </label>
                    <input
                      type="date"
                      className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      value={dueDate}
                      onChange={(e) => setDueDate(e.target.value)}
                    />
                  </div>
                </div>

                {/* From/To Information */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-5 rounded-2xl">
                    <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <User className="w-5 h-5 text-blue-600" />
                      From (Your Business)
                    </h3>
                    <div className="space-y-3">
                      <input
                        className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Your Name"
                        value={fromInfo.name}
                        onChange={(e) =>
                          setFromInfo({ ...fromInfo, name: e.target.value })
                        }
                      />
                      <input
                        className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Company Name"
                        value={fromInfo.company}
                        onChange={(e) =>
                          setFromInfo({ ...fromInfo, company: e.target.value })
                        }
                      />
                      <textarea
                        className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[80px]"
                        placeholder="Address"
                        value={fromInfo.address}
                        onChange={(e) =>
                          setFromInfo({ ...fromInfo, address: e.target.value })
                        }
                      />
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          className="p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Email"
                          type="email"
                          value={fromInfo.email}
                          onChange={(e) =>
                            setFromInfo({ ...fromInfo, email: e.target.value })
                          }
                        />
                        <input
                          className="p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Phone"
                          value={fromInfo.phone}
                          onChange={(e) =>
                            setFromInfo({ ...fromInfo, phone: e.target.value })
                          }
                        />
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-5 rounded-2xl">
                    <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <Building className="w-5 h-5 text-purple-600" />
                      To (Client)
                    </h3>
                    <div className="space-y-3">
                      <input
                        className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                        placeholder="Client Name"
                        value={toInfo.name}
                        onChange={(e) =>
                          setToInfo({ ...toInfo, name: e.target.value })
                        }
                      />
                      <input
                        className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                        placeholder="Company Name"
                        value={toInfo.company}
                        onChange={(e) =>
                          setToInfo({ ...toInfo, company: e.target.value })
                        }
                      />
                      <textarea
                        className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 min-h-[80px]"
                        placeholder="Address"
                        value={toInfo.address}
                        onChange={(e) =>
                          setToInfo({ ...toInfo, address: e.target.value })
                        }
                      />
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          className="p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                          placeholder="Email"
                          type="email"
                          value={toInfo.email}
                          onChange={(e) =>
                            setToInfo({ ...toInfo, email: e.target.value })
                          }
                        />
                        <input
                          className="p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                          placeholder="Phone"
                          value={toInfo.phone}
                          onChange={(e) =>
                            setToInfo({ ...toInfo, phone: e.target.value })
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Items Table */}
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-5 rounded-2xl">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                      <Tag className="w-5 h-5 text-gray-600" />
                      Items & Services
                    </h3>
                    <button
                      onClick={addItem}
                      className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-medium hover:opacity-90 flex items-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      Add Item
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-gray-200">
                          <th className="p-3 text-left text-sm font-medium text-gray-700 rounded-l-xl">
                            Description
                          </th>
                          <th className="p-3 text-left text-sm font-medium text-gray-700">
                            Quantity
                          </th>
                          <th className="p-3 text-left text-sm font-medium text-gray-700">
                            Price
                          </th>
                          <th className="p-3 text-left text-sm font-medium text-gray-700">
                            Tax %
                          </th>
                          <th className="p-3 text-left text-sm font-medium text-gray-700">
                            Total
                          </th>
                          <th className="p-3 text-left text-sm font-medium text-gray-700 rounded-r-xl">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {items.map((item) => (
                          <tr
                            key={item.id}
                            className="border-b border-gray-200 hover:bg-gray-50"
                          >
                            <td className="p-3">
                              <input
                                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                                value={item.description}
                                onChange={(e) =>
                                  updateItem(
                                    item.id,
                                    "description",
                                    e.target.value
                                  )
                                }
                              />
                            </td>
                            <td className="p-3">
                              <input
                                type="number"
                                min="1"
                                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                                value={item.quantity}
                                onChange={(e) =>
                                  updateItem(
                                    item.id,
                                    "quantity",
                                    parseInt(e.target.value) || 1
                                  )
                                }
                              />
                            </td>
                            <td className="p-3">
                              <div className="relative">
                                <span className="absolute left-3 top-2.5 text-gray-500">
                                  $
                                </span>
                                <input
                                  type="number"
                                  min="0"
                                  step="0.01"
                                  className="w-full p-2 pl-7 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                                  value={item.price}
                                  onChange={(e) =>
                                    updateItem(
                                      item.id,
                                      "price",
                                      parseFloat(e.target.value) || 0
                                    )
                                  }
                                />
                              </div>
                            </td>
                            <td className="p-3">
                              <div className="relative">
                                <input
                                  type="number"
                                  min="0"
                                  max="100"
                                  step="0.1"
                                  className="w-full p-2 pr-7 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                                  value={item.tax}
                                  onChange={(e) =>
                                    updateItem(
                                      item.id,
                                      "tax",
                                      parseFloat(e.target.value) || 0
                                    )
                                  }
                                />
                                <span className="absolute right-3 top-2.5 text-gray-500">
                                  %
                                </span>
                              </div>
                            </td>
                            <td className="p-3 font-medium">
                              $
                              {(
                                item.quantity *
                                item.price *
                                (1 + item.tax / 100)
                              ).toFixed(2)}
                            </td>
                            <td className="p-3">
                              <button
                                onClick={() => removeItem(item.id)}
                                disabled={items.length <= 1}
                                className="p-2 hover:bg-red-50 text-red-600 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Notes and Terms */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Notes
                    </label>
                    <textarea
                      className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 min-h-[100px]"
                      placeholder="Add notes or additional information..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Payment Terms
                    </label>
                    <input
                      className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      placeholder="e.g., Net 30, Due on receipt"
                      value={paymentTerms}
                      onChange={(e) => setPaymentTerms(e.target.value)}
                    />
                  </div>
                </div>

                {/* Totals */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-2xl">
                  <h3 className="font-semibold text-gray-900 mb-4">
                    Invoice Summary
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Subtotal:</span>
                      <span className="text-xl font-bold">
                        ${calculateSubtotal().toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Tax:</span>
                      <span className="text-xl font-bold">
                        ${calculateTax().toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center pt-4 border-t border-green-200">
                      <span className="text-2xl font-bold text-gray-900">
                        TOTAL:
                      </span>
                      <span className="text-3xl font-bold text-green-600">
                        ${calculateTotal().toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3 pt-4">
                  <button
                    onClick={handleDownloadPDF}
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold hover:opacity-90 transition-all shadow-lg flex items-center gap-2"
                  >
                    <Printer className="w-5 h-5" />
                    Print/PDF Invoice
                  </button>
                  <button
                    onClick={handleDownloadHTML}
                    className="px-6 py-3 border-2 border-purple-600 text-purple-600 rounded-xl font-bold hover:bg-purple-50 transition-all flex items-center gap-2"
                  >
                    <Download className="w-5 h-5" />
                    Download HTML
                  </button>
                  <button
                    onClick={handleCopyInvoiceNumber}
                    className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-bold hover:bg-gray-50 transition-all flex items-center gap-2"
                  >
                    <Copy className="w-5 h-5" />
                    Copy Invoice #
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Features & Tips */}
        <div className="space-y-6">
          {/* Features Card */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border border-purple-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Check className="w-5 h-5 text-purple-600" />
              Invoice Features
            </h3>
            <div className="space-y-3">
              <div className="p-3 bg-white/70 rounded-lg">
                <div className="font-medium text-gray-900 mb-1">
                  Automatic Calculation
                </div>
                <div className="text-sm text-gray-600">
                  Auto-calculates totals, taxes, and subtotals
                </div>
              </div>
              <div className="p-3 bg-white/70 rounded-lg">
                <div className="font-medium text-gray-900 mb-1">
                  Professional Templates
                </div>
                <div className="text-sm text-gray-600">
                  Beautiful, customizable invoice designs
                </div>
              </div>
              <div className="p-3 bg-white/70 rounded-lg">
                <div className="font-medium text-gray-900 mb-1">
                  Easy Export
                </div>
                <div className="text-sm text-gray-600">
                  Print, PDF, or HTML export options
                </div>
              </div>
            </div>
          </div>

          {/* Tips */}
          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl border border-yellow-100 p-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
              <div>
                <div className="font-medium text-gray-900 mb-2">
                  Invoice Tips
                </div>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mt-1.5"></div>
                    <span>Always include clear payment terms</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mt-1.5"></div>
                    <span>Use professional invoice numbers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mt-1.5"></div>
                    <span>Clearly itemize all services</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl border border-blue-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-blue-600" />
              Payment Methods
            </h3>
            <div className="space-y-2">
              <div className="p-3 bg-white/70 rounded-lg">
                <div className="font-medium text-gray-900">Bank Transfer</div>
              </div>
              <div className="p-3 bg-white/70 rounded-lg">
                <div className="font-medium text-gray-900">Credit Card</div>
              </div>
              <div className="p-3 bg-white/70 rounded-lg">
                <div className="font-medium text-gray-900">PayPal</div>
              </div>
            </div>
          </div>

          {/* Checklist */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Invoice Checklist
            </h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-center gap-2">
                <Check className="w-3 h-3 text-green-600 flex-shrink-0" />
                <span>Unique invoice number</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3 h-3 text-green-600 flex-shrink-0" />
                <span>Clear due date</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3 h-3 text-green-600 flex-shrink-0" />
                <span>Itemized services</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3 h-3 text-green-600 flex-shrink-0" />
                <span>Tax calculations</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3 h-3 text-green-600 flex-shrink-0" />
                <span>Payment terms</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
            <Calculator className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            Auto Calculations
          </h3>
          <p className="text-gray-600">
            Automatic calculation of subtotals, taxes, and totals with real-time
            updates.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center mb-4">
            <FileText className="w-6 h-6 text-pink-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            Professional Design
          </h3>
          <p className="text-gray-600">
            Beautiful, customizable templates that create professional-looking
            invoices.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
            <Download className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            Multiple Formats
          </h3>
          <p className="text-gray-600">
            Export invoices as PDF, HTML, or print directly for easy sharing and
            archiving.
          </p>
        </div>
      </div>

      {/* Ad Space */}
      <div className="mt-8 p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl border border-gray-200 text-center">
        <div className="text-gray-500 mb-2">Advertisement</div>
        <div className="h-[90px] flex items-center justify-center bg-white rounded-xl border border-gray-300">
          <div className="text-gray-400">
            Ad Space (728x90)
            <div className="text-xs mt-1">Support free tools development</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceGenerator;
